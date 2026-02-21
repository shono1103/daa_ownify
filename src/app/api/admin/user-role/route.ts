import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import { getSessionUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

type UpdateRoleBody = {
	userId?: number;
	role?: "USER" | "ADMIN";
};

function isRole(value: string): value is "USER" | "ADMIN" {
	return value === "USER" || value === "ADMIN";
}

export async function POST(request: NextRequest) {
	const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
	const currentUser = await getSessionUser(sessionId);

	if (!currentUser) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	if (currentUser.role !== "ADMIN") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	let body: UpdateRoleBody;
	try {
		body = (await request.json()) as UpdateRoleBody;
	} catch {
		return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
	}

	const userId = Number(body.userId);
	const roleRaw = String(body.role ?? "");

	if (!Number.isInteger(userId) || userId <= 0) {
		return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
	}

	if (!isRole(roleRaw)) {
		return NextResponse.json({ error: "Invalid role" }, { status: 400 });
	}

	try {
		const user = await prisma.user.update({
			where: { id: userId },
			data: { role: roleRaw },
			select: { id: true, email: true, name: true, role: true },
		});

		return NextResponse.json({ user });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}
		throw error;
	}
}
