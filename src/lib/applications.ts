import type { ApplicationSummary } from "@/app/components/types";
import { prisma } from "@/lib/prisma";

export async function fetchApplications(): Promise<ApplicationSummary[]> {
	return prisma.application.findMany({
		orderBy: { id: "asc" },
		select: {
			id: true,
			name: true,
			repoUrl: true,
			totalCoin: true,
		},
	});
}
