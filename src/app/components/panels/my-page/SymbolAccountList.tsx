import type { SymbolAccountSummary } from "../../types";

type SymbolAccountListProps = {
	symbolAccounts: SymbolAccountSummary[];
	symbolAccountsFetchError: boolean;
};

export function SymbolAccountList({
	symbolAccounts,
	symbolAccountsFetchError,
}: SymbolAccountListProps) {
	return (
		<div className="list">
			{symbolAccountsFetchError && (
				<div className="item">
					<div className="left">
						<div className="title">SYMBOLアカウント取得失敗</div>
						<div className="meta">取得に失敗しました。</div>
					</div>
					<span className="badge">ERROR</span>
				</div>
			)}

			{!symbolAccountsFetchError && symbolAccounts.length === 0 && (
				<div className="item">
					<div className="left">
						<div className="title">SYMBOLアカウント未登録</div>
						<div className="meta">上のフォームから公開鍵を登録してください。</div>
					</div>
					<span className="badge">EMPTY</span>
				</div>
			)}

			{symbolAccounts.map((account) => (
				<div key={account.id} className="item">
					<div className="left">
						<div className="title">{account.network}</div>
						<div className="meta break-all">public_key: {account.publicKey}</div>
					</div>
					<span className="badge">登録済み</span>
				</div>
			))}
		</div>
	);
}
