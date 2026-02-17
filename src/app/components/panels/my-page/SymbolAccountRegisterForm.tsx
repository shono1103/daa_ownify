import type { FormEvent } from "react";
import type { SymbolNetwork } from "../../types";

type SymbolAccountRegisterFormProps = {
	network: SymbolNetwork;
	publicKey: string;
	symbolMessage: string | null;
	savingSymbol: boolean;
	onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	onNetworkChange: (network: SymbolNetwork) => void;
	onPublicKeyChange: (publicKey: string) => void;
};

export function SymbolAccountRegisterForm({
	network,
	publicKey,
	symbolMessage,
	savingSymbol,
	onSubmit,
	onNetworkChange,
	onPublicKeyChange,
}: SymbolAccountRegisterFormProps) {
	return (
		<form className="login-form symbol-form" onSubmit={onSubmit}>
			<label htmlFor="symbol-network">SYMBOL Network</label>
			<select
				id="symbol-network"
				value={network}
				onChange={(event) => onNetworkChange(event.target.value as SymbolNetwork)}
			>
				<option value="mainnet">mainnet</option>
				<option value="testnet">testnet</option>
			</select>

			<label htmlFor="symbol-public-key">SYMBOL Public Key (64 hex)</label>
			<input
				id="symbol-public-key"
				type="text"
				value={publicKey}
				onChange={(event) => onPublicKeyChange(event.target.value)}
				required
				minLength={64}
				maxLength={64}
				placeholder="例: ABCDEF..."
			/>

			{symbolMessage ? <p className="login-error">{symbolMessage}</p> : null}

			<button className="btn primary" type="submit" disabled={savingSymbol}>
				{savingSymbol ? "登録中..." : "SYMBOL公開鍵を登録"}
			</button>
		</form>
	);
}
