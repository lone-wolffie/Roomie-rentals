function PropertyDetails ({ property, onBack }) {
    if (!property) {
        return (
            <div className="main-container">
                <h2>Property not found</h2>

                <button onClick={onBack}>Back to listings</button>
            </div>
        );
    }

    return (
        <div className="property-details">
            <button className="back-button" onClick={onBack}>
                Back to listings
            </button>

            <div className="property-details-image">
                <img 
                    src={`http://localhost:3000${property.photos?.[0]}`} alt={property.title}
                />
            </div>

            <div className="property-details-content">
                <div className="card-region">
                    {property.region}
                </div>

                <h2>{property.title}</h2>

                <div className="property-location">
                    {property.neighbourhood}
                </div>

                <div className="property-details-data">
                    <span> 🛏️ {property.bedrooms} bedroom(s)</span>
                    <span> 🚿 {property.bathrooms} bathroom(s)</span>
                    <span> 📐 {property.size} sqm</span>
                </div>

                <div className="property-details-price">
                    Ksh {property.price}
                </div>

                <div className="property-details-description">
                    <h2>Description</h2>
                    <p>{property.description}</p>
                </div>

                <div className="property-amenities">
                    <h2>Amenities</h2>

                    <div className="amenities-list"> 
                        {property.amenities?.map((amenity, index) => (
                            <span key={index}>
                                {amenity}
                            </span>
                        ))}    
                    </div>
                </div>

                <div className="property-contact">

                    <h2>Contact</h2>

                    <p>{property.phone}</p>

                    <button className="contact-owner-button">
                        Contact Owner
                    </button>

                </div>
            </div>
        </div>
    );
}
          
export default PropertyDetails;