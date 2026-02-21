import type { ApplicationSummary } from "../../types";

type AppListingApprovalSubPanelProps = {
	applications: ApplicationSummary[];
	approvalMessage: string | null;
	onApprove: (appName: string) => void;
	onReject: (appName: string) => void;
};

export function AppListingApprovalSubPanel({
	applications,
	approvalMessage,
	onApprove,
	onReject,
}: AppListingApprovalSubPanelProps) {
	return (
		<div className="list">
			{applications.length === 0 && (
				<div className="item">
					<div className="left">
						<div className="title">承認対象がありません</div>
						<div className="meta">現在、審査待ちのアプリはありません。</div>
					</div>
				</div>
			)}
			{applications.map((app) => (
				<div key={app.id} className="item">
					<div className="left">
						<div className="title">
							{app.id}: {app.name}
						</div>
						<div className="meta break-all">{app.repoUrl}</div>
					</div>
					<div className="header-actions">
						<button className="btn primary" type="button" onClick={() => onApprove(app.name)}>
							承認
						</button>
						<button className="btn" type="button" onClick={() => onReject(app.name)}>
							差し戻し
						</button>
					</div>
				</div>
			))}
			{approvalMessage && <p className="form-message">{approvalMessage}</p>}
		</div>
	);
}
