import type { AuthUser } from "../../types";

type UserProfileSummaryProps = {
	currentUser: AuthUser;
};

export function UserProfileSummary({ currentUser }: UserProfileSummaryProps) {
	return (
		<div className="list">
			<div className="item">
				<div className="left">
					<div className="title">ユーザーID</div>
					<div className="meta">{currentUser.id}</div>
				</div>
				<span className="badge">id</span>
			</div>
			<div className="item">
				<div className="left">
					<div className="title">表示名</div>
					<div className="meta">{currentUser.name}</div>
				</div>
				<span className="badge">name</span>
			</div>
			<div className="item">
				<div className="left">
					<div className="title">メールアドレス</div>
					<div className="meta">{currentUser.email}</div>
				</div>
				<span className="badge">email</span>
			</div>
		</div>
	);
}
