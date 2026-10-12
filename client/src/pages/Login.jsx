import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
                return;
            }
            setSuccessMessage("Login was successful!");

            // navigate to home page
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            setErrorMessage("Error during login. Please try again.", error);
        }

    };

    return (
        <div className="main-container">
            <h2>Admin Login</h2>

            <div className="login-container">
                <form onSubmit={handleLogin}>

                    <label>Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Please enter your email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Please enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>

                    {successMessage && (
                        <p className="success-message">
                            {successMessage}
                        </p>
                    )}

                    {errorMessage && (
                        <p id="error-message">
                        {errorMessage}
                        </p>
                    )}

                </form>
            </div>
        </div>
    );
}

export default Login;