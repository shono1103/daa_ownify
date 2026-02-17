import { randomBytes } from "node:crypto";
import type { AuthUser } from "@/app/components/types";
import { SESSION_TTL_MS } from "@/lib/auth/constants";
import { prisma } from "@/lib/prisma";

export function createSessionToken(): string {
	return randomBytes(32).toString("hex");
}

export async function createSession(userId: number): Promise<string> {
	const id = createSessionToken();
	const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

	await prisma.session.create({
		data: {
			id,
			userId,
			expiresAt,
		},
	});

	return id;
}

export async function deleteSession(sessionId: string): Promise<void> {
	await prisma.session.deleteMany({ where: { id: sessionId } });
}

export async function getSessionUser(sessionId: string | undefined): Promise<AuthUser | null> {
	if (!sessionId) {
		return null;
	}

	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		select: {
			id: true,
			expiresAt: true,
			user: {
				select: {
					id: true,
					name: true,
					email: true,
				},
			},
		},
	});

	if (!session) {
		return null;
	}

	if (session.expiresAt.getTime() <= Date.now()) {
		await deleteSession(session.id);
		return null;
	}

	return session.user;
}
