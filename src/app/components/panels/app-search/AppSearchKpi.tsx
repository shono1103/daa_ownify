import type { ApplicationSummary } from "../../types";

type AppSearchKpiProps = {
	applications: ApplicationSummary[];
	applicationsFetchError: boolean;
	selectedApp: ApplicationSummary | null;
};

export function AppSearchKpi({
	applications,
	applicationsFetchError,
	selectedApp,
}: AppSearchKpiProps) {
	return (
		<div className="kpi" aria-label="KPI">
			<div className="box">
				<div className="label">候補数</div>
				<div className="value">{applications.length}</div>
			</div>
			<div className="box">
				<div className="label">選択中ID</div>
				<div className="value">{selectedApp?.id ?? "-"}</div>
			</div>
			<div className="box">
				<div className="label">取得状態</div>
				<div className="value">{applicationsFetchError ? "失敗" : "成功"}</div>
			</div>
		</div>
	);
}
