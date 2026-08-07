import { useState } from "react";
import { Link } from "react-router-dom";
import "../login.css";

function Register() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();

    if (!fullName || !phoneNumber || !email || !password) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    setErrorMessage("");

    console.log({
      fullName,
      phoneNumber,
      email,
      password,
    });

  };

  return (
    <div className="main-container">
      <h2>Admin Registration</h2>

      <div className="registration-container">
        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text" 
            id="fullName"
            placeholder="Please enter your full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />

         <label>Phone Number</label>  
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Please enter your phone number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />

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
            Register
          </button>

          <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
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

export default Register;