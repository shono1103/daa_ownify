"use client";

import type { ApplicationSummary } from "../types";
import { AppSearchDetail } from "./app-search/AppSearchDetail";
import { AppSearchKpi } from "./app-search/AppSearchKpi";
import { AppSearchList } from "./app-search/AppSearchList";
import { useSelectedApplication } from "./app-search/useSelectedApplication";

type AppSearchPanelProps = {
	active: boolean;
	applications: ApplicationSummary[];
	applicationsFetchError: boolean;
};

export function AppSearchPanel({
	active,
	applications,
	applicationsFetchError,
}: AppSearchPanelProps) {
	const { selectedApp, resolvedSelectedAppId, setSelectedAppId } =
		useSelectedApplication(applications);

	return (
		<section
			className={`page ${active ? "active" : ""}`}
			id="page-app-search"
			data-page="app-search"
			aria-label="app検索"
		>
			<div className="grid">
				<div className="card">
					<h2>app検索</h2>
					<p>applicationsテーブルの一覧を表示しています。</p>

					<AppSearchKpi
						applications={applications}
						applicationsFetchError={applicationsFetchError}
						selectedApp={selectedApp}
					/>

					<AppSearchList
						applications={applications}
						applicationsFetchError={applicationsFetchError}
						resolvedSelectedAppId={resolvedSelectedAppId}
						onSelect={setSelectedAppId}
					/>
				</div>

				<div className="card">
					<h2>詳細表示</h2>
					<AppSearchDetail selectedApp={selectedApp} />
				</div>
			</div>
		</section>
	);
}
