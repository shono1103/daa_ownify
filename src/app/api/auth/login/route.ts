import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, SESSION_TTL_MS } from "@/lib/auth/constants";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

type LoginBody = {
	email?: string;
	password?: string;
};

export async function POST(request: Request) {
	let body: LoginBody;

	try {
		body = (await request.json()) as LoginBody;
	} catch {
		return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
	}

	const email = body.email?.trim().toLowerCase();
	const password = body.password ?? "";

	if (!email || !password) {
		return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
	}

	const user = await prisma.user.findUnique({
		where: { email },
		select: {
			id: true,
			passwordHash: true,
		},
	});

	const invalidCredentials = NextResponse.json(
		{ error: "Invalid email or password" },
		{ status: 401 },
	);

	if (!user?.passwordHash) {
		return invalidCredentials;
	}

	const ok = await verifyPassword(password, user.passwordHash);
	if (!ok) {
		return invalidCredentials;
	}

	const sessionId = await createSession(user.id);
	const response = NextResponse.json({ ok: true });

	response.cookies.set({
		name: SESSION_COOKIE_NAME,
		value: sessionId,
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: Math.floor(SESSION_TTL_MS / 1000),
	});

	return response;
}
