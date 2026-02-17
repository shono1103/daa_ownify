export function HoldingsErrorState() {
	return (
		<div className="item">
			<div className="left">
				<div className="title">DB接続に失敗しました</div>
				<div className="meta">ownInfos の取得に失敗しました。</div>
			</div>
			<span className="badge">ERROR</span>
		</div>
	);
}

export function HoldingsEmptyState() {
	return (
		<div className="item">
			<div className="left">
				<div className="title">保有appはありません</div>
				<div className="meta">OwnInfo テーブルに該当レコードが存在しません。</div>
			</div>
			<span className="badge">EMPTY</span>
		</div>
	);
}
