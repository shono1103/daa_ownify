import type { AdminUserSummary } from "@/app/components/types";
import { prisma } from "@/lib/prisma";

export async function fetchAllUsersForAdmin(): Promise<AdminUserSummary[]> {
	const rows = await prisma.user.findMany({
		orderBy: [{ id: "asc" }],
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
		},
	});

	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		email: row.email,
		role: row.role,
	}));
}
