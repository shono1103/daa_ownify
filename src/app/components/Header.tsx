import type { AuthUser, Route } from "./types";
import { getTabConfig } from "./tabConfig";

type HeaderProps = {
	route: Route;
	currentUser: AuthUser;
	onRouteChange: (route: Route) => void;
};

export function Header({ route, currentUser, onRouteChange }: HeaderProps) {
	const tabConfig = getTabConfig(currentUser);

	const handleLogout = async () => {
		await fetch("/api/auth/logout", { method: "POST" });
		window.location.href = "/login";
	};

	return (
		<header>
			<div className="header-inner">
				<div className="brand">
					<div className="logo" aria-hidden="true" />
					<div>
						<h1>DAA Ownify</h1>
						<div className="sub">Header Tabs Navigation</div>
					</div>
				</div>

				<nav className="tabs" aria-label="主要機能ナビゲーション">
					<div className="tablist" role="tablist" aria-label="機能タブ">
						{tabConfig.map((tab) => (
							<button
								key={tab.route}
								className="tab"
								type="button"
								role="tab"
								aria-selected={route === tab.route}
								onClick={() => onRouteChange(tab.route)}
							>
								{tab.label}
							</button>
						))}
					</div>
				</nav>

				<div className="header-actions">
					<span className="badge user-badge">{currentUser.name}</span>
					<button className="btn" type="button" onClick={handleLogout}>
						ログアウト
					</button>
				</div>
			</div>
		</header>
	);
}
