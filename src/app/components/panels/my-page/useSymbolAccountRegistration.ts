import { FormEvent, useState } from "react";
import type { SymbolNetwork } from "../../types";

export function useSymbolAccountRegistration() {
	const [network, setNetwork] = useState<SymbolNetwork>("mainnet");
	const [publicKey, setPublicKey] = useState("");
	const [symbolMessage, setSymbolMessage] = useState<string | null>(null);
	const [savingSymbol, setSavingSymbol] = useState(false);

	const onRegisterSymbol = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSavingSymbol(true);
		setSymbolMessage(null);

		try {
			const response = await fetch("/api/user/symbol-account", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					network,
					publicKey,
				}),
			});

			const payload = (await response.json()) as { error?: string };
			if (!response.ok) {
				setSymbolMessage(payload.error ?? "登録に失敗しました");
				return;
			}

			setSymbolMessage("SYMBOL公開鍵を登録しました。画面を再読み込みすると反映されます。");
			setPublicKey("");
		} catch {
			setSymbolMessage("登録に失敗しました");
		} finally {
			setSavingSymbol(false);
		}
	};

	return {
		network,
		publicKey,
		symbolMessage,
		savingSymbol,
		onRegisterSymbol,
		setNetwork,
		setPublicKey,
	};
}
