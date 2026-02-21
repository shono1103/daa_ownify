import { randomBytes } from "node:crypto";
import { Prisma } from "@prisma/client";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";

const globalForBootstrap = globalThis as unknown as {
	bootstrapAdminPromise?: Promise<void>;
};
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 1500;

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

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
	for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
		try {
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
					role: "ADMIN",
					passwordHash,
				},
			});

			console.log(`[bootstrap-admin] Created initial ADMIN user: ${email}`);
			return;
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === "P2021"
			) {
				console.warn("[bootstrap-admin] skipped: user table is not created yet. Run migrations.");
				return;
			}

			const label = error instanceof Error ? error.message : String(error);
			if (attempt < MAX_RETRIES) {
				console.warn(`[bootstrap-admin] attempt ${attempt}/${MAX_RETRIES} failed: ${label}`);
				await sleep(RETRY_DELAY_MS);
				continue;
			}
			console.error(
				`[bootstrap-admin] skipped after ${MAX_RETRIES} failed attempts: ${label}`,
			);
		}
	}
}

export function ensureBootstrapAdmin(): Promise<void> {
	if (!globalForBootstrap.bootstrapAdminPromise) {
		globalForBootstrap.bootstrapAdminPromise = bootstrapAdminIfNeeded().catch(() => {
			globalForBootstrap.bootstrapAdminPromise = undefined;
		});
	}
	return globalForBootstrap.bootstrapAdminPromise;
}
