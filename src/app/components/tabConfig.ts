import type { Route } from "./types";

export const tabConfig: { route: Route; label: string }[] = [
	{ route: "app-search", label: "app検索" },
	{ route: "holdings", label: "保有app" },
	{ route: "balance", label: "残高" },
	{ route: "my-page", label: "マイページ" },
];
