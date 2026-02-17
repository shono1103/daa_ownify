"use client";

import type { SymbolAccountSummary, SymbolBalanceSummary } from "../types";
import { SymbolAccountSelector } from "./balance/SymbolAccountSelector";
import { SymbolBalanceContent } from "./balance/SymbolBalanceContent";
import { useSelectedSymbolAccount } from "./balance/useSelectedSymbolAccount";
import { useSelectedSymbolBalance } from "./balance/useSelectedSymbolBalance";

type BalancePanelProps = {
	active: boolean;
	symbolAccounts: SymbolAccountSummary[];
	symbolBalances: SymbolBalanceSummary[];
	symbolBalancesFetchError: boolean;
};

export function BalancePanel({
	active,
	symbolAccounts,
	symbolBalances,
	symbolBalancesFetchError,
}: BalancePanelProps) {
	const {
		resolvedSelectedNetwork,
		symbolAccountsForNetwork,
		resolvedSelectedSymbolKey,
		selectedSymbolAccount,
		setSelectedNetwork,
		setSelectedSymbolKey,
	} = useSelectedSymbolAccount(symbolAccounts);

	const selectedSymbolBalance = useSelectedSymbolBalance(symbolBalances, selectedSymbolAccount);

	return (
		<section
			className={`page ${active ? "active" : ""}`}
			id="page-balance"
			data-page="balance"
			aria-label="残高"
		>
			<div className="card">
				<h2>残高</h2>
				<p>ドロップダウンで選択したSYMBOLアカウントのXYM残高を表示しています。</p>
				<div className="list">
					{!symbolBalancesFetchError && symbolAccounts.length > 0 && (
						<SymbolAccountSelector
							selectedNetwork={resolvedSelectedNetwork}
							symbolAccountsForNetwork={symbolAccountsForNetwork}
							resolvedSelectedSymbolKey={resolvedSelectedSymbolKey}
							onNetworkChange={setSelectedNetwork}
							onAccountChange={setSelectedSymbolKey}
						/>
					)}

					<SymbolBalanceContent
						symbolBalancesFetchError={symbolBalancesFetchError}
						symbolAccounts={symbolAccounts}
						selectedNetwork={resolvedSelectedNetwork}
						symbolAccountsForNetwork={symbolAccountsForNetwork}
						selectedSymbolAccount={selectedSymbolAccount}
						selectedSymbolBalance={selectedSymbolBalance}
					/>
				</div>
			</div>
		</section>
	);
}
