import type { HoldingSummary } from "../../types";

type HoldingListItemProps = {
	holding: HoldingSummary;
};

export function HoldingListItem({ holding }: HoldingListItemProps) {
	return (
		<div className="item">
			<div className="left">
				<div className="title">{holding.app.name}</div>
				<div className="meta">
					app_id: {holding.appId} • user_id: {holding.userId} • share_count: {holding.shareCount}
				</div>
			</div>
			<span className="badge">保有中</span>
		</div>
	);
}
