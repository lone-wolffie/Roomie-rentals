import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen((previous) => !previous);
    };

    const handleAdminClick = () => {
        closeMenu();

        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
            navigate("/login");
            return;
        }

        try {
            const user = JSON.parse(savedUser);

            if (user) {
                navigate("/owner-dashboard");
            } else {
                navigate("/login");
            }
        } catch (error) {
            navigate("/login");
        }
    };

    return (
        <nav className="nav">
            <div className="nav-inner">
                <Link to="/" className="logo" onClick={closeMenu}>
                    <span className="logo-icon">🏠</span>

                    <span className="logo-text">
                        Affordable Houses <em>Kenya</em>
                    </span>
                </Link>

                <div className="nav-links">
                    <a href="#listings">Browse</a>
                    <Link to="/post-house">Post a House</Link>

                    <button 
                        type="button" 
                        className="admin-btn" 
                        onClick={handleAdminClick}
                    >
                        Admin
                    </button>
                </div>

                <button 
                    type="button"
                    className="hamburger"
                    onClick={toggleMenu}
                >
                    ☰
                </button>
            </div>

            <div
                id="mobile-navigation"
                className={`mobile-nav ${isMenuOpen ? "open" : ""}`}
            >
                <a href="#listings" onClick={closeMenu}>
                    Browse
                </a>

                <Link to="/post-house" onClick={closeMenu}>
                    Post a House
                </Link>

                <Link
                    to={localStorage.getItem("user") ? "/owner-dashboard" : "/login"}
                    onClick={closeMenu}
                >
                    Admin
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;