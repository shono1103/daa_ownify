"use client";

import type { AdminUserSummary } from "../types";

type UserListPanelProps = {
	active: boolean;
	users: AdminUserSummary[];
	usersFetchError: boolean;
};

export function UserListPanel({ active, users, usersFetchError }: UserListPanelProps) {
	return (
		<section
			className={`page ${active ? "active" : ""}`}
			id="page-user-list"
			data-page="user-list"
			aria-label="ユーザー一覧"
		>
			<div className="card">
				<h2>ユーザー一覧</h2>
				<p>ADMINユーザー向けに、登録済みユーザーの一覧を表示しています。</p>

				<div className="list">
					{usersFetchError && (
						<div className="item">
							<div className="left">
								<div className="title">取得エラー</div>
								<div className="meta">ユーザー一覧の取得に失敗しました。</div>
							</div>
						</div>
					)}

					{!usersFetchError && users.length === 0 && (
						<div className="item">
							<div className="left">
								<div className="title">ユーザーがありません</div>
								<div className="meta">現在表示できるユーザーが存在しません。</div>
							</div>
						</div>
					)}

					{users.map((user) => (
						<div key={user.id} className="item">
							<div className="left">
								<div className="title">
									{user.id}: {user.name}
								</div>
								<div className="meta break-all">{user.email}</div>
							</div>
							<span className="badge">{user.role}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
