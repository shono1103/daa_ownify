export type Route =
	| "app-search"
	| "app-listing-request"
	| "user-list"
	| "holdings"
	| "balance"
	| "my-page";

export type ApplicationSummary = {
	id: number;
	name: string;
	repoUrl: string;
	totalCoin: number;
};

export type HoldingSummary = {
	appId: number;
	userId: number;
	shareCount: number;
	app: ApplicationSummary;
};

export type UserSummary = {
	id: number;
	name: string;
	email: string;
	role?: "USER" | "ADMIN";
};

export type SymbolNetwork = "mainnet" | "testnet";

export type SymbolAccountSummary = {
	id: number;
	userId: number;
	network: SymbolNetwork;
	publicKey: string;
	createdAt: string;
	updatedAt: string;
};

export type SymbolBalanceSummary = {
	network: SymbolNetwork;
	publicKey: string;
	xymMicro: string;
	xym: string;
	endpoint: string;
	error?: string;
};

export type AuthUser = UserSummary;

export type AdminUserSummary = {
	id: number;
	name: string;
	email: string;
	role: "USER" | "ADMIN";
};
