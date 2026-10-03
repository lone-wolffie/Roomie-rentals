import { useState } from "react";

function Hero( { onSearch} ) {
    // search filters 
    const [region, setRegion] = useState("All Regions");
    const [type, setType] = useState("Any Type");
    const [price, setPrice] = useState("Any Price");

    const handleSearch = () => {
        onSearch({
            region,
            type,
            price
        });
    };

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

                            <select    
                                value={region}  
                                onChange={(event) => setRegion(event.target.value)}
                            >
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

                            <select         
                                value={type}    
                                onChange={(event) => setType(event.target.value)}   
                            >
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

                            <select         
                                value={price}   
                                onChange={(event) => setPrice(event.target.value)}
                            >
                                <option>Any Price</option>
                                <option value="5000">Under 5,000</option>
                                <option value="10000">Under 10,000</option>
                                <option value="20000">Under 20,000</option>
                                <option value="40000">Under 40,000</option>
                                <option value="80000">Under 80,000</option>
                                <option value="150000">Under 150,000</option>
                            </select>
                        </div>

                        <button 
                            className="search-btn"  
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Hero;