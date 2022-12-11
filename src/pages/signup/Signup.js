// styles
import "./Signup.css";
// hooks
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [displayName, setdisplayName] = useState("");
	const [password, setPassword] = useState("");
	const {error, isPending, signup} = useSignup()

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(email, password, displayName)
	};

	return (
		<form onSubmit={handleSubmit} className="signup-form">
			<h2>Signup</h2>
			<label id="email">email:</label>
			<input
				id="email"
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>
			<label id="password">password:</label>
			<input
				id="password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>
			<label id="displayName">display name:</label>
			<input
				id="displayName"
				type="text"
				onChange={(e) => setdisplayName(e.target.value)}
				value={displayName}
			/>
			{!isPending && <button className="btn">Signup</button>}
			{isPending && <button className="btn" disabled>Loading</button>}
			{error && <p>{ error}</p> }
		</form>
	);
}
