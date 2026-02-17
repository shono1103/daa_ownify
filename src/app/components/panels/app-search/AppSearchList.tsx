import type { ApplicationSummary } from "../../types";

type AppSearchListProps = {
	applications: ApplicationSummary[];
	applicationsFetchError: boolean;
	resolvedSelectedAppId: number | null;
	onSelect: (appId: number) => void;
};

export function AppSearchList({
	applications,
	applicationsFetchError,
	resolvedSelectedAppId,
	onSelect,
}: AppSearchListProps) {
	return (
		<div className="list" aria-label="applications一覧">
			{applicationsFetchError && (
				<div className="item">
					<div className="left">
						<div className="title">DB接続に失敗しました</div>
						<div className="meta">DATABASE_URL と DB 起動状態を確認してください。</div>
					</div>
					<span className="badge">ERROR</span>
				</div>
			)}

			{!applicationsFetchError && applications.length === 0 && (
				<div className="item">
					<div className="left">
						<div className="title">データがありません</div>
						<div className="meta">Application テーブルにレコードを作成してください。</div>
					</div>
					<span className="badge">EMPTY</span>
				</div>
			)}

			{applications.map((app) => (
				<button
					key={app.id}
					type="button"
					className={`item item-button ${resolvedSelectedAppId === app.id ? "item-active" : ""}`}
					onClick={() => onSelect(app.id)}
				>
					<div className="left">
						<div className="title">{app.name}</div>
						<div className="meta">ID: {app.id} • total_coin: {app.totalCoin}</div>
					</div>
					<span className="badge">詳細</span>
				</button>
			))}
		</div>
	);
}
