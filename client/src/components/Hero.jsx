function Hero() {
    return (
        <header className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    Find Your<br/><em>Perfect Home</em><br/>in Kenya
                </h1>
                <p className="hero-sub">    
                    Affordable houses across Nairobi, Mombasa, Kisumu & others. 
                </p>

                <div className="search-card">
                    <div className="search-row">
                        <div className  ="search-field">
                            <label>Region</label>

                            <select id="searchRegion">
                                <option>All Regions</option>
                                <option>Nairobi</option>
                                <option>Mombasa</option>
                                <option>Thika</option>
                                <option>Nakuru</option>
                                <option>Eldoret</option>
                                <option>Kisumu</option>
                                <option>Nyeri</option>
                            </select>
                        </div>

                        <div className="search-field">
                            <label>Type of house</label>

                            <select id="searchType">
                                <option>Any Type</option>
                                <option>Bedsitter</option>
                                <option>1 Bedroom</option>
                                <option>2 Bedrooms</option>
                                <option>3 Bedrooms</option>
                                <option>4+ Bedrooms</option>
                            </select>
                        </div>

                        <div className="search-field">
                            <label>Price (Ksh)</label>

                            <select id="searchPrice">
                                <option>Any Price</option>
                                <option value="5000">Under 5,000</option>
                                <option value="10000">Under 10,000</option>
                                <option value="20000">Under 20,000</option>
                                <option value="40000">Under 40,000</option>
                                <option value="80000">Under 80,000</option>
                                <option value="150000">Under 150,000</option>
                            </select>
                        </div>

                        <button className="search-btn" id="searchBtn">Search</button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Hero;