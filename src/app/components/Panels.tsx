import type {
	ApplicationSummary,
	AuthUser,
	HoldingSummary,
	Route,
	SymbolAccountSummary,
	SymbolBalanceSummary,
} from "./types";
import { AppSearchPanel } from "./panels/AppSearchPanel";
import { BalancePanel } from "./panels/BalancePanel";
import { HoldingsPanel } from "./panels/HoldingsPanel";
import { MyPagePanel } from "./panels/MyPagePanel";

type PanelsProps = {
	route: Route;
	currentUser: AuthUser;
	applications: ApplicationSummary[];
	applicationsFetchError: boolean;
	holdings: HoldingSummary[];
	holdingsFetchError: boolean;
	symbolAccounts: SymbolAccountSummary[];
	symbolAccountsFetchError: boolean;
	symbolBalances: SymbolBalanceSummary[];
	symbolBalancesFetchError: boolean;
};

export function Panels({
	route,
	currentUser,
	applications,
	applicationsFetchError,
	holdings,
	holdingsFetchError,
	symbolAccounts,
	symbolAccountsFetchError,
	symbolBalances,
	symbolBalancesFetchError,
}: PanelsProps) {
	return (
		<main>
			<AppSearchPanel
				active={route === "app-search"}
				applications={applications}
				applicationsFetchError={applicationsFetchError}
			/>
			<HoldingsPanel
				active={route === "holdings"}
				holdings={holdings}
				holdingsFetchError={holdingsFetchError}
			/>
			<BalancePanel
				active={route === "balance"}
				symbolAccounts={symbolAccounts}
				symbolBalances={symbolBalances}
				symbolBalancesFetchError={symbolBalancesFetchError}
			/>
			<MyPagePanel
				active={route === "my-page"}
				currentUser={currentUser}
				symbolAccounts={symbolAccounts}
				symbolAccountsFetchError={symbolAccountsFetchError}
			/>
		</main>
	);
}
