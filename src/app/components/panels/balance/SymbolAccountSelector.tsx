import type { SymbolAccountSummary, SymbolNetwork } from "../../types";

type SymbolAccountSelectorProps = {
	selectedNetwork: SymbolNetwork;
	symbolAccountsForNetwork: SymbolAccountSummary[];
	resolvedSelectedSymbolKey: string;
	onNetworkChange: (network: SymbolNetwork) => void;
	onAccountChange: (key: string) => void;
};

export function SymbolAccountSelector({
	selectedNetwork,
	symbolAccountsForNetwork,
	resolvedSelectedSymbolKey,
	onNetworkChange,
	onAccountChange,
}: SymbolAccountSelectorProps) {
	return (
		<div className="login-form symbol-form">
			<label htmlFor="balance-network">ネットワーク</label>
			<select
				id="balance-network"
				value={selectedNetwork}
				onChange={(event) => onNetworkChange(event.target.value as SymbolNetwork)}
			>
				<option value="mainnet">mainnet</option>
				<option value="testnet">testnet</option>
			</select>

			<label htmlFor="balance-symbol-account">表示アカウント</label>
			<select
				id="balance-symbol-account"
				value={resolvedSelectedSymbolKey}
				onChange={(event) => onAccountChange(event.target.value)}
				disabled={symbolAccountsForNetwork.length === 0}
			>
				{symbolAccountsForNetwork.length === 0 && <option value="">選択可能なアカウントがありません</option>}
				{symbolAccountsForNetwork.map((account) => (
					<option
						key={`${account.network}:${account.publicKey}`}
						value={`${account.network}:${account.publicKey}`}
					>
						{account.network} - {account.publicKey.slice(0, 16)}...
					</option>
				))}
			</select>
		</div>
	);
}
