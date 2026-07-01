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
                    <a href="#">Browse Houses</a>
                    <a href="#">Post a House</a>
                    <a href="login.html">Admin Login</a>
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
                    <a href="#">Report a Listing</a>
                    <a href="#">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;