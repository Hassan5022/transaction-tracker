import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

// styles
import "./Navbar.css";

export default function Navbar() {
	const { user } = useAuthContext();
	const { logout } = useLogout();

	return (
		<nav className="navbar">
			<ul>
				<li className="title">My Money</li>
				{!user && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</>
				)}
				{user && (
					<>
						<li>{`Hello, ${user.displayName}`}</li>
						<li>
							<button className="btn" onClick={logout}>
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
