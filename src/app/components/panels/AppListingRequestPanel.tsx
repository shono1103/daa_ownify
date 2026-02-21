"use client";

import { FormEvent, useState } from "react";
import type { ApplicationSummary, AuthUser } from "../types";
import { AppListingApprovalSubPanel } from "./app-listing-request/AppListingApprovalSubPanel";
import { AppListingRequestForm } from "./app-listing-request/AppListingRequestForm";

type AppListingRequestPanelProps = {
	active: boolean;
	currentUser: AuthUser;
	applications: ApplicationSummary[];
};

type ListingSubTab = "request" | "approval";

export function AppListingRequestPanel({
	active,
	currentUser,
	applications,
}: AppListingRequestPanelProps) {
	const isAdmin = currentUser.role === "ADMIN";
	const [subTab, setSubTab] = useState<ListingSubTab>("request");
	const [requestMessage, setRequestMessage] = useState<string | null>(null);
	const [approvalMessage, setApprovalMessage] = useState<string | null>(null);

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setRequestMessage("上場申請を受け付けました。審査結果は後日通知されます。");
	};

	const onApprove = (appName: string) => {
		setApprovalMessage(`${appName} の上場申請を承認しました。（モック）`);
	};

	const onReject = (appName: string) => {
		setApprovalMessage(`${appName} の上場申請を差し戻しました。（モック）`);
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

				{isAdmin && (
					<nav className="tabs" aria-label="上場申請サブタブ">
						<div className="tablist" role="tablist" aria-label="上場申請サブタブ">
							<button
								className="tab"
								type="button"
								role="tab"
								aria-selected={subTab === "request"}
								onClick={() => setSubTab("request")}
							>
								申請
							</button>
							<button
								className="tab"
								type="button"
								role="tab"
								aria-selected={subTab === "approval"}
								onClick={() => setSubTab("approval")}
							>
								承認
							</button>
						</div>
					</nav>
				)}

				{(!isAdmin || subTab === "request") && (
					<AppListingRequestForm onSubmit={onSubmit} requestMessage={requestMessage} />
				)}

				{isAdmin && subTab === "approval" && (
					<AppListingApprovalSubPanel
						applications={applications}
						approvalMessage={approvalMessage}
						onApprove={onApprove}
						onReject={onReject}
					/>
				)}
			</div>
		</section>
	);
}
