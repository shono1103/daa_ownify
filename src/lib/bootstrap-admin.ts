import { randomBytes } from "node:crypto";
import { UserRole } from "@prisma/client";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";

const globalForBootstrap = globalThis as unknown as {
	bootstrapAdminPromise?: Promise<void>;
};

function resolveBootstrapAdminConfig(): { email: string; name: string; password: string } {
	const email = (process.env.BOOTSTRAP_ADMIN_EMAIL ?? "admin@example.com").trim().toLowerCase();
	const name = (process.env.BOOTSTRAP_ADMIN_NAME ?? "admin").trim() || "admin";
	const password = process.env.BOOTSTRAP_ADMIN_PASSWORD?.trim();

	if (!password) {
		const generated = randomBytes(12).toString("base64url");
		console.warn(
			`[bootstrap-admin] BOOTSTRAP_ADMIN_PASSWORD is not set. Generated one-time password: ${generated}`,
		);
		return { email, name, password: generated };
	}

	return { email, name, password };
}

async function bootstrapAdminIfNeeded(): Promise<void> {
	const userCount = await prisma.user.count();
	if (userCount > 0) {
		return;
	}

	const { email, name, password } = resolveBootstrapAdminConfig();
	const passwordHash = await hashPassword(password);

	await prisma.user.create({
		data: {
			email,
			name,
			role: UserRole.ADMIN,
			passwordHash,
		},
	});

	console.log(`[bootstrap-admin] Created initial ADMIN user: ${email}`);
}

export function ensureBootstrapAdmin(): Promise<void> {
	if (!globalForBootstrap.bootstrapAdminPromise) {
		globalForBootstrap.bootstrapAdminPromise = bootstrapAdminIfNeeded().catch((error) => {
			globalForBootstrap.bootstrapAdminPromise = undefined;
			throw error;
		});
	}
	return globalForBootstrap.bootstrapAdminPromise;
}
