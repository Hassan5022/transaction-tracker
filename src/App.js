// hooks
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import { Error } from "./components/Error";

function App() {
	const { authIsReady, user } = useAuthContext();

	return (
		<div className="App">
			{authIsReady && (
				<BrowserRouter>
					<Navbar />
					<Routes>
						{/* Home */}
						{user && <Route path="/" element={<Home />} />}
						{!user && <Route path="/" element={<Navigate to={"/login"} />} />}

						{/* Login */}
						{user && <Route path="/login" element={<Navigate to={"/"} />} />}
						{!user && <Route path="/login" element={<Login />} />}

						{/* Signup */}
						{user && <Route path="/signup" element={<Navigate to={"/"} />} />}
						{!user && <Route path="/signup" element={<Signup />} />}

						{/* Invalid url */}
						<Route path="*" element={<Error user = {user}/>} />
					</Routes>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App;
