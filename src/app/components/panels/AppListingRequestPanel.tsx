"use client";

import { FormEvent, useState } from "react";

type AppListingRequestPanelProps = {
	active: boolean;
};

export function AppListingRequestPanel({ active }: AppListingRequestPanelProps) {
	const [message, setMessage] = useState<string | null>(null);

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setMessage("上場申請を受け付けました。審査結果は後日通知されます。");
	};

	return (
		<section
			className={`page ${active ? "active" : ""}`}
			id="page-app-listing-request"
			data-page="app-listing-request"
			aria-label="アプリ上場申請"
		>
			<div className="card">
				<h2>アプリ上場申請</h2>
				<p>会員持分券・収益分配券の発行に向けた申請情報を入力します。</p>

				<form className="login-form" onSubmit={onSubmit}>
					<label htmlFor="listing-app-name">アプリ名</label>
					<input id="listing-app-name" name="appName" type="text" required />

					<label htmlFor="listing-repo-url">リポジトリURL</label>
					<input id="listing-repo-url" name="repoUrl" type="url" required />

					<label htmlFor="listing-network">上場ネットワーク</label>
					<select id="listing-network" name="network" defaultValue="testnet">
						<option value="testnet">testnet</option>
						<option value="mainnet">mainnet</option>
					</select>

					<label htmlFor="listing-total-units">会員持分券の発行口数</label>
					<input
						id="listing-total-units"
						name="totalUnits"
						type="number"
						min={1}
						step={1}
						defaultValue={100000}
						required
					/>

					<label htmlFor="listing-sale-policy">初期販売ポリシー</label>
					<select id="listing-sale-policy" name="salePolicy" defaultValue="owner-buyback">
						<option value="owner-buyback">アプリ所有者に優先買戻し</option>
						<option value="full-listing">全口数を上場</option>
					</select>

					<button className="btn primary" type="submit">
						申請する
					</button>
				</form>

				{message && <p className="form-message">{message}</p>}
			</div>
		</section>
	);
}
