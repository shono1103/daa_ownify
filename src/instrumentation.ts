export async function register() {
	if (process.env.NEXT_RUNTIME && process.env.NEXT_RUNTIME !== "nodejs") {
		return;
	}

	const { ensureBootstrapAdmin } = await import("@/lib/bootstrap-admin");
	await ensureBootstrapAdmin();
}
