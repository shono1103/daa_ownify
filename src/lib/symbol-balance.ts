import type { SymbolAccountSummary, SymbolBalanceSummary, SymbolNetwork } from "@/app/components/types";

const NETWORK_CONFIG: Record<
	SymbolNetwork,
	{ endpoints: string[]; xymMosaicId: string }
> = {
	mainnet: {
		endpoints: (
			process.env.SYMBOL_MAINNET_NODE_URLS ??
			process.env.SYMBOL_MAINNET_NODE_URL ??
			[
				"https://symbol-main-1.nemtus.com:3001",
				"https://symbol-main-2.nemtus.com:3001",
			].join(",")
		)
			.split(",")
			.map((x) => x.trim())
			.filter(Boolean),
		xymMosaicId: (process.env.SYMBOL_MAINNET_XYM_MOSAIC_ID ?? "6BED913FA20223F8").toUpperCase(),
	},
	testnet: {
		endpoints: (
			process.env.SYMBOL_TESTNET_NODE_URLS ??
			process.env.SYMBOL_TESTNET_NODE_URL ??
			[
				"https://001-sai-dual.symboltest.net:3001",
				"https://201-sai-dual.symboltest.net:3001",
				"https://401-sai-dual.symboltest.net:3001",
				"https://symbol-test-1.nemtus.com:3001",
			].join(",")
		)
			.split(",")
			.map((x) => x.trim())
			.filter(Boolean),
		xymMosaicId: (process.env.SYMBOL_TESTNET_XYM_MOSAIC_ID ?? "72C0212E67A08BCE").toUpperCase(),
	},
};

function formatMicroXym(microText: string): string {
	const micro = BigInt(microText);
	const million = BigInt(1000000);
	const zero = BigInt(0);
	const whole = micro / million;
	const frac = micro % million;
	if (frac === zero) {
		return whole.toString();
	}
	return `${whole}.${frac.toString().padStart(6, "0").replace(/0+$/, "")}`;
}

async function fetchAccountXymBalance(
	account: SymbolAccountSummary,
): Promise<SymbolBalanceSummary> {
	const config = NETWORK_CONFIG[account.network];
	const endpointErrors: string[] = [];

	for (const endpoint of config.endpoints) {
		const url = `${endpoint}/accounts/${account.publicKey}`;
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000);

		try {
			const response = await fetch(url, {
				method: "GET",
				signal: controller.signal,
				cache: "no-store",
			});

			if (!response.ok) {
				endpointErrors.push(`${endpoint}:HTTP_${response.status}`);
				continue;
			}

			const payload = (await response.json()) as {
				account?: { mosaics?: Array<{ id: string; amount: string }> };
			};

			const mosaics = payload.account?.mosaics ?? [];
			const xym = mosaics.find((m) => m.id.toUpperCase() === config.xymMosaicId);
			const micro = xym?.amount ?? "0";

			return {
				network: account.network,
				publicKey: account.publicKey,
				xymMicro: micro,
				xym: formatMicroXym(micro),
				endpoint,
			};
		} catch (error) {
			const message = error instanceof Error ? error.name : "request_failed";
			endpointErrors.push(`${endpoint}:${message}`);
		} finally {
			clearTimeout(timeoutId);
		}
	}

	return {
		network: account.network,
		publicKey: account.publicKey,
		xymMicro: "0",
		xym: "0",
		endpoint: config.endpoints[0] ?? "n/a",
		error: endpointErrors.join(" | ") || "request_failed",
	};
}

export async function fetchXymBalances(
	accounts: SymbolAccountSummary[],
): Promise<SymbolBalanceSummary[]> {
	return Promise.all(accounts.map((account) => fetchAccountXymBalance(account)));
}

export function sumXymMicro(balances: SymbolBalanceSummary[]): string {
	let total = BigInt(0);
	for (const balance of balances) {
		if (balance.error) {
			continue;
		}
		total += BigInt(balance.xymMicro);
	}
	return total.toString();
}

export function formatXymFromMicro(microText: string): string {
	return formatMicroXym(microText);
}
