import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen((previous) => !previous);
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

                    <Link to="/login" className="admin-btn">
                        Admin
                    </Link>
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

                <Link to="/login" onClick={closeMenu}>
                    Admin
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;