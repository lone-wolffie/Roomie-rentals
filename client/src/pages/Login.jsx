import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setErrorMessage("");

    console.log({
      email,
      password,
    });

    navigate("/");
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