import { useMemo } from "react";
import type { SymbolAccountSummary, SymbolBalanceSummary } from "../../types";

export function useSelectedSymbolBalance(
	symbolBalances: SymbolBalanceSummary[],
	selectedSymbolAccount: SymbolAccountSummary | null,
) {
	return useMemo(() => {
		if (!selectedSymbolAccount) {
			return null;
		}

		return (
			symbolBalances.find(
				(balance) =>
					balance.network === selectedSymbolAccount.network &&
					balance.publicKey === selectedSymbolAccount.publicKey,
			) ?? null
		);
	}, [symbolBalances, selectedSymbolAccount]);
}
