"use client";

import type { AuthUser, SymbolAccountSummary } from "../types";
import { SymbolAccountList } from "./my-page/SymbolAccountList";
import { SymbolAccountRegisterForm } from "./my-page/SymbolAccountRegisterForm";
import { UserProfileSummary } from "./my-page/UserProfileSummary";
import { useSymbolAccountRegistration } from "./my-page/useSymbolAccountRegistration";

type MyPagePanelProps = {
	active: boolean;
	currentUser: AuthUser;
	symbolAccounts: SymbolAccountSummary[];
	symbolAccountsFetchError: boolean;
};

export function MyPagePanel({
	active,
	currentUser,
	symbolAccounts,
	symbolAccountsFetchError,
}: MyPagePanelProps) {
	const {
		network,
		publicKey,
		symbolMessage,
		savingSymbol,
		onRegisterSymbol,
		setNetwork,
		setPublicKey,
	} = useSymbolAccountRegistration();

	return (
		<section
			className={`page ${active ? "active" : ""}`}
			id="page-my-page"
			data-page="my-page"
			aria-label="マイページ"
		>
			<div className="card">
				<h2>マイページ</h2>
				<p>ログイン中ユーザーの設定情報とSYMBOL公開鍵設定を表示しています。</p>

				<UserProfileSummary currentUser={currentUser} />

				<SymbolAccountRegisterForm
					network={network}
					publicKey={publicKey}
					symbolMessage={symbolMessage}
					savingSymbol={savingSymbol}
					onSubmit={onRegisterSymbol}
					onNetworkChange={setNetwork}
					onPublicKeyChange={setPublicKey}
				/>

				<SymbolAccountList
					symbolAccounts={symbolAccounts}
					symbolAccountsFetchError={symbolAccountsFetchError}
				/>
			</div>
		</section>
	);
}
