import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="logo">
          <span className="logo-icon">🏠</span>

          <span className="logo-text">
            Affordable Houses <em>Kenya</em>
          </span>
        </a>

        <div className="nav-links">
          <a href="#listings">Browse</a>
          <Link to="/post-house">Post a House</Link>

          <Link to="/login" className="btn-admin">
            Admin
          </Link>
        </div>

        <button className="hamburger">
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;