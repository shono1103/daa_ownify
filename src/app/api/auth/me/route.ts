import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import { getSessionUser } from "@/lib/auth/session";

export async function GET(request: NextRequest) {
	const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
	const user = await getSessionUser(sessionId);

	if (!user) {
		return NextResponse.json({ user: null }, { status: 401 });
	}

	if (user.role === "ADMIN") {
		return NextResponse.json({ user });
	}

	return NextResponse.json({
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
		},
	});
}
