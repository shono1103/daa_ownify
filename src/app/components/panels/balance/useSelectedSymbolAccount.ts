import { useMemo, useState } from "react";
import type { SymbolAccountSummary, SymbolNetwork } from "../../types";

export function useSelectedSymbolAccount(symbolAccounts: SymbolAccountSummary[]) {
	const [selectedNetwork, setSelectedNetwork] = useState<SymbolNetwork>("mainnet");
	const [selectedSymbolKey, setSelectedSymbolKey] = useState("");

	const resolvedSelectedNetwork = useMemo(() => {
		const hasSelectedNetwork = symbolAccounts.some((account) => account.network === selectedNetwork);
		if (hasSelectedNetwork || symbolAccounts.length === 0) {
			return selectedNetwork;
		}
		return symbolAccounts[0].network;
	}, [selectedNetwork, symbolAccounts]);

	const symbolAccountsForNetwork = useMemo(
		() => symbolAccounts.filter((account) => account.network === resolvedSelectedNetwork),
		[resolvedSelectedNetwork, symbolAccounts],
	);

	const resolvedSelectedSymbolKey = useMemo(() => {
		if (symbolAccountsForNetwork.length === 0) {
			return "";
		}

		const hasCurrent = symbolAccountsForNetwork.some(
			(account) => `${account.network}:${account.publicKey}` === selectedSymbolKey,
		);

		if (hasCurrent) {
			return selectedSymbolKey;
		}

		return `${symbolAccountsForNetwork[0].network}:${symbolAccountsForNetwork[0].publicKey}`;
	}, [symbolAccountsForNetwork, selectedSymbolKey]);

	const selectedSymbolAccount = useMemo(
		() => {
			if (!resolvedSelectedSymbolKey) {
				return null;
			}
			return (
				symbolAccountsForNetwork.find(
					(account) => `${account.network}:${account.publicKey}` === resolvedSelectedSymbolKey,
				) ?? null
			);
		},
		[resolvedSelectedSymbolKey, symbolAccountsForNetwork],
	);

	return {
		resolvedSelectedNetwork,
		symbolAccountsForNetwork,
		resolvedSelectedSymbolKey,
		selectedSymbolAccount,
		setSelectedNetwork,
		setSelectedSymbolKey,
	};
}
