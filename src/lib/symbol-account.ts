import type { SymbolAccountSummary, SymbolNetwork } from "@/app/components/types";
import { prisma } from "@/lib/prisma";

export const SYMBOL_PUBLIC_KEY_REGEX = /^[0-9A-Fa-f]{64}$/;

export function isValidSymbolPublicKey(value: string): boolean {
	return SYMBOL_PUBLIC_KEY_REGEX.test(value);
}

export function normalizeSymbolPublicKey(value: string): string {
	return value.trim().toUpperCase();
}

export async function fetchSymbolAccountsByUserId(userId: number): Promise<SymbolAccountSummary[]> {
	const rows = await prisma.userSymbolAccount.findMany({
		where: { userId },
		orderBy: [{ network: "asc" }],
		select: {
			id: true,
			userId: true,
			network: true,
			publicKey: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return rows.map((row) => ({
		id: row.id,
		userId: row.userId,
		network: row.network,
		publicKey: row.publicKey,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	}));
}

export async function upsertSymbolAccountByUserId(
	userId: number,
	network: SymbolNetwork,
	publicKey: string,
): Promise<SymbolAccountSummary> {
	const normalized = normalizeSymbolPublicKey(publicKey);

	const row = await prisma.userSymbolAccount.upsert({
		where: {
			userId_network: {
				userId,
				network,
			},
		},
		update: {
			publicKey: normalized,
		},
		create: {
			userId,
			network,
			publicKey: normalized,
		},
		select: {
			id: true,
			userId: true,
			network: true,
			publicKey: true,
			createdAt: true,
			updatedAt: true,
		},
	});

	return {
		id: row.id,
		userId: row.userId,
		network: row.network,
		publicKey: row.publicKey,
		createdAt: row.createdAt.toISOString(),
		updatedAt: row.updatedAt.toISOString(),
	};
}
