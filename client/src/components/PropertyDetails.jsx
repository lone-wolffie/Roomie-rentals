import { useState } from "react";

function PropertyDetails({ property, onBack }) {
    // track the photo being displayed
    const [photoIndex, setPhotoIndex] = useState(0);

    if (!property) {
        return (
            <div className="main-container">
                <h2>Property not found</h2>
                <button onClick={onBack}>Back to listings</button>
            </div>
        );
    }

    const photos = Array.isArray(property.photos) ? property.photos : [];
    const hasPhotos = photos.length > 0;

    // Move to the previous photo
    const handlePreviousPhoto = () => {
        setPhotoIndex((previousIndex) =>
            (previousIndex - 1 + photos.length) % photos.length
        );
    };

    // Move to the next photo
    const handleNextPhoto = () => {
        setPhotoIndex((previousIndex) =>
            (previousIndex + 1) % photos.length
        );
    };

    return (
        <div className="property-details">
            <button className="back-button" onClick={onBack}>
                Back to listings
            </button>

            <div className="property-details-image">
                {hasPhotos ? (
                    <>
                        <img
                            src={`http://localhost:3000${photos[photoIndex]}`}
                            alt={`${property.title} - Photo ${photoIndex + 1}`}
                        />

                        {photos.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    id="photo-prev"
                                    aria-label="Previous photo"
                                    onClick={handlePreviousPhoto}
                                >
                                    &#10094;
                                </button>

                                <button
                                    type="button"
                                    id="photo-next"
                                    aria-label="Next photo"
                                    onClick={handleNextPhoto}
                                >
                                    &#10095;
                                </button>

                                <span className="photo-counter">
                                    {photoIndex + 1} / {photos.length}
                                </span>
                            </>
                        )}
                    </>
                ) : (
                    <div className="no-photo">
                        No photo available
                    </div>
                )}
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
                    <span>🛏️ {property.bedrooms} bedroom(s)</span>
                    <span>🚿 {property.bathrooms} bathroom(s)</span>
                    <span>📐 {property.size} sqm</span>
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
