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
          <a href="#regions">Regions</a>
          <a href="#about">About</a>

          <a href="/login.html" className="btn-admin">
            Admin
          </a>
        </div>

        <button className="hamburger">
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;