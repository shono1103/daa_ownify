"use client";

import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Panels } from "./Panels";
import { getTabConfig } from "./tabConfig";
import type {
	AdminUserSummary,
	ApplicationSummary,
	AuthUser,
	HoldingSummary,
	Route,
	SymbolAccountSummary,
	SymbolBalanceSummary,
} from "./types";

type AppShellClientProps = {
	currentUser: AuthUser;
	applications: ApplicationSummary[];
	applicationsFetchError: boolean;
	holdings: HoldingSummary[];
	holdingsFetchError: boolean;
	symbolAccounts: SymbolAccountSummary[];
	symbolAccountsFetchError: boolean;
	symbolBalances: SymbolBalanceSummary[];
	symbolBalancesFetchError: boolean;
	adminUsers: AdminUserSummary[];
	adminUsersFetchError: boolean;
};

function getRouteFromHash(currentUser: AuthUser): Route {
	const hash = (window.location.hash || "").replace("#", "").trim();
	const tabConfig = getTabConfig(currentUser);
	const route = tabConfig.find((tab) => tab.route === hash)?.route;
	return route ?? "app-search";
}

export function AppShellClient({
	currentUser,
	applications,
	applicationsFetchError,
	holdings,
	holdingsFetchError,
	symbolAccounts,
	symbolAccountsFetchError,
	symbolBalances,
	symbolBalancesFetchError,
	adminUsers,
	adminUsersFetchError,
}: AppShellClientProps) {
	const [route, setRoute] = useState<Route>("app-search");

	useEffect(() => {
		const handleHashChange = () => {
			setRoute(getRouteFromHash(currentUser));
		};

		handleHashChange();
		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, [currentUser]);

	const setRouteWithHash = (nextRoute: Route) => {
		if (window.location.hash !== `#${nextRoute}`) {
			window.history.replaceState(null, "", `#${nextRoute}`);
		}
		setRoute(nextRoute);
	};

	return (
		<div className="app">
			<Header route={route} onRouteChange={setRouteWithHash} currentUser={currentUser} />
			<Panels
				route={route}
				currentUser={currentUser}
				applications={applications}
				applicationsFetchError={applicationsFetchError}
				holdings={holdings}
				holdingsFetchError={holdingsFetchError}
				symbolAccounts={symbolAccounts}
				symbolAccountsFetchError={symbolAccountsFetchError}
				symbolBalances={symbolBalances}
				symbolBalancesFetchError={symbolBalancesFetchError}
				adminUsers={adminUsers}
				adminUsersFetchError={adminUsersFetchError}
			/>

			<footer>© {new Date().getFullYear()} DAA Ownify • DAA Ownify</footer>
		</div>
	);
}
