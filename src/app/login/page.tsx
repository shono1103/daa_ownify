"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const nextPath = searchParams.get("next") ?? "/";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const data = (await response.json()) as { error?: string };
				setError(data.error ?? "ログインに失敗しました");
				return;
			}

			router.push(nextPath);
			router.refresh();
		} catch {
			setError("ログインに失敗しました");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="login-shell">
			<section className="login-card" aria-label="ログイン">
				<h1>ログイン</h1>
				<p>登録済みユーザーのメールアドレスとパスワードを入力してください。</p>

				<form className="login-form" onSubmit={onSubmit}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						required
						autoComplete="email"
					/>

					<label htmlFor="password">Password</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						required
						autoComplete="current-password"
					/>

					{error ? <p className="login-error">{error}</p> : null}

					<button className="btn primary" type="submit" disabled={loading}>
						{loading ? "ログイン中..." : "ログイン"}
					</button>
				</form>
			</section>
		</main>
	);
}
