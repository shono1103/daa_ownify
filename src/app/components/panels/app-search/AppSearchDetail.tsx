import type { ApplicationSummary } from "../../types";

type AppSearchDetailProps = {
	selectedApp: ApplicationSummary | null;
};

export function AppSearchDetail({ selectedApp }: AppSearchDetailProps) {
	if (!selectedApp) {
		return <p>左の一覧からアプリを選択すると詳細が表示されます。</p>;
	}

	return (
		<div className="list">
			<div className="item">
				<div className="left">
					<div className="title">アプリ名</div>
					<div className="meta">{selectedApp.name}</div>
				</div>
				<span className="badge">name</span>
			</div>
			<div className="item">
				<div className="left">
					<div className="title">リポジトリURL</div>
					<div className="meta break-all">{selectedApp.repoUrl}</div>
				</div>
				<span className="badge">repo_url</span>
			</div>
			<div className="item">
				<div className="left">
					<div className="title">コイン合計</div>
					<div className="meta">{selectedApp.totalCoin}</div>
				</div>
				<span className="badge">total_coin</span>
			</div>
		</div>
	);
}
