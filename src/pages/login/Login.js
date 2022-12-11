// styles
import "./Login.css";
// hooks
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { error, isPending, login } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password)
		
	};

	return (
		<form onSubmit={handleSubmit} className="login-form">
			<h2>login</h2>
			<label id="email">email:</label>
			<input
				id="email"
				required
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<label id="password">password:</label>
			<input
				id="password"
				required
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			{!isPending && <button className="btn">Login</button>}
			{isPending && (
				<button className="btn" disabled>
					Loading
				</button>
			)}
			{error && <p>{error}</p>}
		</form>
	);
}
