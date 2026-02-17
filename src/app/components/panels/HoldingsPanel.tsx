import type { HoldingSummary } from "../types";
import { HoldingListItem } from "./holdings/HoldingListItem";
import { HoldingsEmptyState, HoldingsErrorState } from "./holdings/HoldingsStates";

type HoldingsPanelProps = {
	active: boolean;
	holdings: HoldingSummary[];
	holdingsFetchError: boolean;
};

export function HoldingsPanel({ active, holdings, holdingsFetchError }: HoldingsPanelProps) {
	return (
		<section
			className={`page ${active ? "active" : ""}`}
			id="page-holdings"
			data-page="holdings"
			aria-label="保有app"
		>
			<div className="card">
				<h2>保有app</h2>
				<p>セッション中アカウントに紐づく ownInfos の全件を表示しています。</p>
				<div className="list">
					{holdingsFetchError && <HoldingsErrorState />}

					{!holdingsFetchError && holdings.length === 0 && <HoldingsEmptyState />}

					{holdings.map((holding) => (
						<HoldingListItem key={`${holding.userId}-${holding.appId}`} holding={holding} />
					))}
				</div>
			</div>
		</section>
	);
}
