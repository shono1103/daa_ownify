import type { FormEvent } from "react";

type AppListingRequestFormProps = {
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	requestMessage: string | null;
};

export function AppListingRequestForm({
	onSubmit,
	requestMessage,
}: AppListingRequestFormProps) {
	return (
		<>
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
			{requestMessage && <p className="form-message">{requestMessage}</p>}
		</>
	);
}
