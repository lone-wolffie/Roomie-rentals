import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login.css";

import { API_URL } from "../config.js";

function Register() {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");

        if (!fullName || !phoneNumber || !email || !password) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    phoneNumber,
                    email,
                    password,
                }),
            });
            
            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.message);
                setTimeout(() => {
                    setErrorMessage("");
                }, 4000);
                return;
            } 

            // save registered user's details
            const user = data.user;

            if (!user) {
                setErrorMessage("Account created. Please try logging in.");
                return;
            }

            localStorage.setItem("user", JSON.stringify(user));
            setSuccessMessage("Registration was successful!");

            // Navigate to the home page after successful registration
            setTimeout(() => {
                navigate("/owner-dashboard");
            }, 1500);
        } catch (error) {
            console.error("Registration error:", error)
            setErrorMessage("Error during registration. Please try again.");
        }  
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

export default Register;