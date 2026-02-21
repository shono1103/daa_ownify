import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppShellClient } from "./components/AppShellClient";
import type {
	ApplicationSummary,
	HoldingSummary,
	SymbolAccountSummary,
	SymbolBalanceSummary,
} from "./components/types";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import { getSessionUser } from "@/lib/auth/session";
import { fetchApplications } from "@/lib/applications";
import { fetchHoldingsByUserId } from "@/lib/holdings";
import { fetchSymbolAccountsByUserId } from "@/lib/symbol-account";
import { fetchXymBalances } from "@/lib/symbol-balance";

export const dynamic = "force-dynamic";

export default async function Home() {
	const cookieStore = await cookies();
	const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
	const user = await getSessionUser(sessionId);

	if (!user) {
		redirect("/login");
	}

	const currentUser =
		user.role === "ADMIN"
			? user
			: {
					id: user.id,
					name: user.name,
					email: user.email,
				};

	let applications: ApplicationSummary[] = [];
	let applicationsFetchError = false;

	try {
		applications = await fetchApplications();
	} catch (error) {
		applicationsFetchError = true;
		console.error("Failed to fetch applications", error);
	}

	let holdings: HoldingSummary[] = [];
	let holdingsFetchError = false;

	try {
		holdings = await fetchHoldingsByUserId(user.id);
	} catch (error) {
		holdingsFetchError = true;
		console.error("Failed to fetch holdings", error);
	}

	let symbolAccounts: SymbolAccountSummary[] = [];
	let symbolAccountsFetchError = false;

	try {
		symbolAccounts = await fetchSymbolAccountsByUserId(user.id);
	} catch (error) {
		symbolAccountsFetchError = true;
		console.error("Failed to fetch symbol accounts", error);
	}

	let symbolBalances: SymbolBalanceSummary[] = [];
	let symbolBalancesFetchError = false;

	try {
		symbolBalances = await fetchXymBalances(symbolAccounts);
	} catch (error) {
		symbolBalancesFetchError = true;
		console.error("Failed to fetch symbol balances", error);
	}

	return (
		<AppShellClient
			currentUser={currentUser}
			applications={applications}
			applicationsFetchError={applicationsFetchError}
			holdings={holdings}
			holdingsFetchError={holdingsFetchError}
			symbolAccounts={symbolAccounts}
			symbolAccountsFetchError={symbolAccountsFetchError}
			symbolBalances={symbolBalances}
			symbolBalancesFetchError={symbolBalancesFetchError}
		/>
	);
}
