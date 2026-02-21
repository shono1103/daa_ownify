import type { AuthUser, Route } from "./types";

export function getTabConfig(currentUser: AuthUser): { route: Route; label: string }[] {
	const tabs: { route: Route; label: string }[] = [
		{ route: "app-search", label: "app検索" },
		{ route: "app-listing-request", label: "アプリ上場申請" },
		{ route: "holdings", label: "保有app" },
		{ route: "balance", label: "残高" },
		{ route: "my-page", label: "マイページ" },
	];

	if (currentUser.role === "ADMIN") {
		tabs.push({ route: "user-list", label: "ユーザー一覧" });
	}

	return tabs;
}
