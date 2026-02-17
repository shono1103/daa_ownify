import type { SymbolAccountSummary, SymbolBalanceSummary, SymbolNetwork } from "../../types";

type SymbolBalanceContentProps = {
	symbolBalancesFetchError: boolean;
	symbolAccounts: SymbolAccountSummary[];
	selectedNetwork: SymbolNetwork;
	symbolAccountsForNetwork: SymbolAccountSummary[];
	selectedSymbolAccount: SymbolAccountSummary | null;
	selectedSymbolBalance: SymbolBalanceSummary | null;
};

export function SymbolBalanceContent({
	symbolBalancesFetchError,
	symbolAccounts,
	selectedNetwork,
	symbolAccountsForNetwork,
	selectedSymbolAccount,
	selectedSymbolBalance,
}: SymbolBalanceContentProps) {
	if (symbolBalancesFetchError) {
		return (
			<div className="item">
				<div className="left">
					<div className="title">残高取得失敗</div>
					<div className="meta">SYMBOLノードへのアクセスに失敗しました。</div>
				</div>
				<span className="badge">ERROR</span>
			</div>
		);
	}

	if (symbolAccounts.length === 0) {
		return (
			<div className="item">
				<div className="left">
					<div className="title">SYMBOLアカウント未登録</div>
					<div className="meta">マイページから公開鍵を登録してください。</div>
				</div>
				<span className="badge">EMPTY</span>
			</div>
		);
	}

	if (symbolAccountsForNetwork.length === 0) {
		return (
			<div className="item">
				<div className="left">
					<div className="title">{selectedNetwork} に登録済みアカウントがありません</div>
					<div className="meta">マイページで {selectedNetwork} の公開鍵を登録してください。</div>
				</div>
				<span className="badge">EMPTY</span>
			</div>
		);
	}

	if (selectedSymbolBalance && !selectedSymbolBalance.error) {
		return (
			<div className="item item-active">
				<div className="left">
					<div className="title">{selectedSymbolBalance.network}</div>
					<div className="meta break-all">public_key: {selectedSymbolBalance.publicKey}</div>
					<div className="meta">endpoint: {selectedSymbolBalance.endpoint}</div>
				</div>
				<span className="badge">{selectedSymbolBalance.xym} XYM</span>
			</div>
		);
	}

	if (selectedSymbolBalance && selectedSymbolBalance.error) {
		return (
			<div className="item">
				<div className="left">
					<div className="title">{selectedSymbolBalance.network}</div>
					<div className="meta break-all">public_key: {selectedSymbolBalance.publicKey}</div>
					<div className="meta">endpoint: {selectedSymbolBalance.endpoint}</div>
					<div className="meta">error: {selectedSymbolBalance.error}</div>
				</div>
				<span className="badge">取得失敗</span>
			</div>
		);
	}

	if (!selectedSymbolBalance && selectedSymbolAccount) {
		return (
			<div className="item">
				<div className="left">
					<div className="title">{selectedSymbolAccount.network}</div>
					<div className="meta break-all">public_key: {selectedSymbolAccount.publicKey}</div>
					<div className="meta">残高情報を取得できませんでした。</div>
				</div>
				<span className="badge">N/A</span>
			</div>
		);
	}

	return (
		<div className="item">
			<div className="left">
				<div className="title">表示アカウント未選択</div>
				<div className="meta">ドロップダウンから選択してください。</div>
			</div>
			<span className="badge">N/A</span>
		</div>
	);
}
