import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import type { SymbolNetwork } from "@/app/components/types";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import { getSessionUser } from "@/lib/auth/session";
import {
	fetchSymbolAccountsByUserId,
	isValidSymbolPublicKey,
	upsertSymbolAccountByUserId,
} from "@/lib/symbol-account";

type RegisterBody = {
	network?: SymbolNetwork;
	publicKey?: string;
};

function isNetwork(value: string): value is SymbolNetwork {
	return value === "mainnet" || value === "testnet";
}

export async function GET(request: NextRequest) {
	const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
	const user = await getSessionUser(sessionId);

	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const accounts = await fetchSymbolAccountsByUserId(user.id);
	return NextResponse.json({ accounts });
}

export async function POST(request: NextRequest) {
	const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
	const user = await getSessionUser(sessionId);

	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	let body: RegisterBody;
	try {
		body = (await request.json()) as RegisterBody;
	} catch {
		return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
	}

	const networkRaw = body.network ?? "mainnet";
	const publicKey = (body.publicKey ?? "").trim();

	if (!isNetwork(networkRaw)) {
		return NextResponse.json({ error: "Invalid network" }, { status: 400 });
	}

	if (!isValidSymbolPublicKey(publicKey)) {
		return NextResponse.json(
			{ error: "publicKey must be 64-char hex string" },
			{ status: 400 },
		);
	}

	try {
		const account = await upsertSymbolAccountByUserId(user.id, networkRaw, publicKey);
		return NextResponse.json({ account });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
			return NextResponse.json(
				{ error: "publicKey already registered by another user" },
				{ status: 409 },
			);
		}
		throw error;
	}
}
