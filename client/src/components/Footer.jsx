import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <span className="logo-text">
                        Affordable Houses <em>Kenya</em>
                    </span>
                    <p>Kenya's trusted home rental platform.</p>
                </div>

                <div className="footer-links">
                    <h4>Platform</h4>
                    <a href="#listings">Browse Houses</a>
                    <Link to="/post-house">Post a House</Link>
                    <Link to="/login" className="footer-link">
                        Admin Login
                    </Link>
                </div>

                <div className="footer-links">
                    <h4>Regions</h4>
                    <a href="#">Nairobi</a>
                    <a href="#">Mombasa</a>
                    <a href="#">Thika</a>
                    <a href="#">Nakuru</a>
                    <a href="#">Eldoret</a>
                    <a href="#">Kisumu</a>
                    <a href="#">Nyeri</a>
                </div>

                <div className="footer-links">
                    <h4>Support</h4>
                    <a href="#">Help Center</a>
                    <a href="#">Report a House</a>
                    <a href="#">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;