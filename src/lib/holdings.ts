import type { HoldingSummary } from "@/app/components/types";
import { prisma } from "@/lib/prisma";

export async function fetchHoldingsByUserId(userId: number): Promise<HoldingSummary[]> {
	const rows = await prisma.ownInfo.findMany({
		where: { userId },
		orderBy: [{ appId: "asc" }],
		select: {
			appId: true,
			userId: true,
			coinAmount: true,
			app: {
				select: {
					id: true,
					name: true,
					repoUrl: true,
					totalCoin: true,
				},
			},
		},
	});

	return rows.map((row) => ({
		appId: row.appId,
		userId: row.userId,
		coinAmount: row.coinAmount,
		app: {
			id: row.app.id,
			name: row.app.name,
			repoUrl: row.app.repoUrl,
			totalCoin: row.app.totalCoin,
		},
	}));
}
