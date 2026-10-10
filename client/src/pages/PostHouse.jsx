import { useState, useRef } from "react";
import "../login.css";

function PostHouse() {
    const [title, setTitle] = useState("");
    const [region, setRegion] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [type, setType] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [otherAmenity, setOtherAmenity] = useState("");
    const [phone, setPhone] = useState("");
    const [photos, setPhotos] = useState([]);
    const photoInputRef = useRef(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // handling form submission
    const handlePostHouse = async (event) => {
        event.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        // validating form inputs
        if (!title.trim()) {
            alert("Please enter a property title.");
            return;
        }

        if (!region) {
            alert("Please select a region.");
            return;
        }

        if (!neighbourhood.trim()) {
            alert("Please enter the neighbourhood.");
            return;
        }

        if (!type) {
            alert("Please select the house type.");
            return;
        }

        if (!bedrooms) {
            alert("Please enter the number of bedrooms.");
            return;
        }

        if (!bathrooms) {
            alert("Please enter the number of bathrooms.");
            return;
        }

        if (!size) {
            alert("Please enter the property size.");
            return;
        }

        if (!price) {
            alert("Please enter the property price.");
            return;
        }

        if (!phone.trim()) {
            alert("Please enter a phone number.");
            return;
        }

        if (!description.trim()) {
            alert("Please enter a property description.");
            return;
        }

        if (amenities.length === 0) {
            alert("Please select at least one amenity.");
            return;
        }

        if (photos.length === 0) {
            alert("Please select at least one property photo.");
            return;
        }

        const finalAmenities = [
            ...amenities.filter((amenity) => amenity !== "Others"),
            ...(otherAmenity ? otherAmenity
                  .split(",")
                  .map((amenity) => amenity.trim())
                  .filter(Boolean) : []

            )
        ];

        // creating a new property object
        const newProperty = {
            title: title.trim(),
            region,
            neighbourhood: neighbourhood.trim(),
            type,
            bedrooms: Number(bedrooms),
            bathrooms: Number(bathrooms),
            size: Number(size),
            price: Number(price),
            description: description.trim(),
            amenities: finalAmenities,
            phone: phone.trim(),
            photos
        };

        try {
            // sending the new property to the server
            const formData = new FormData();

            formData.append("property", JSON.stringify({
                ...newProperty,
                photos: []
            }));

            photos.forEach((photo) => {
                formData.append("photos", photo);
            });

            const response = await fetch("http://localhost:3000/api/properties", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to post property");
            }

            console.log("Server response:", data);

            setSuccessMessage("House posted successfully");
            setTimeout(() => {  
                setSuccessMessage("");  
            }, 1000);
        } catch (error) {
            console.error("Error posting house:", error);
            setErrorMessage("Failed to post house. Please try again.");
        }

        // clearing input fields after successful submission
        setTitle("");
        setRegion("");
        setNeighbourhood("");
        setType("");
        setBedrooms("");
        setBathrooms("");
        setSize("");
        setPrice("");
        setDescription("");
        setAmenities([]);
        setOtherAmenity("");
        setPhone("");
        setPhotos([]);

        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }
    }

    // handling amenities selection
    const handleAmenityChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setAmenities((previousAmenities) => [
            ...previousAmenities,
            value
            ]);
        } else {
            setAmenities((previousAmenities) =>
            previousAmenities.filter(
                (amenity) => amenity !== value
            )
            );
        }
    };

    // handling photo selection 
    const handlePhotoChange = (event) => {
        const selectedPhotos = Array.from(event.target.files); 

        setPhotos((previousPhotos) => [
            ...previousPhotos,
            ...selectedPhotos
        ]);
    };

    // handling photo removal
    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((previousPhotos) => 
            previousPhotos.filter((_, index) => index !== indexToRemove)
        );

        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }
    };

    // form contents 
    return (
        <div className="main-container">

            <h2>Post a House</h2>

            <div className="post-house-container">
                <p>List a property you would like to sell or rent</p>

                <form onSubmit={handlePostHouse} className="post-house-form">
                    <label>Property Title</label>
                    <input
                        type="text"
                        placeholder="e.g. 2 Bedroom Apartment"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    <label>Region</label>
                    <select
                        value={region}
                        onChange={(event) => setRegion(event.target.value)}
                    >
                        <option value="">Select a region</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Thika">Thika</option>
                        <option value="Nakuru">Nakuru</option>
                        <option value="Eldoret">Eldoret</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Nyeri">Nyeri</option>
                    </select>

                    <label>Neighbourhood</label>
                    <input
                        type="text"
                        placeholder="e.g. Kilimani"
                        value={neighbourhood}
                        onChange={(event) => setNeighbourhood(event.target.value)}
                    />

                    <label>House Type</label>
                    <select
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    >
                        <option value="">Select house type</option>
                        <option value="Bedsitter">Bedsitter</option>
                        <option value="1 Bedroom">1 Bedroom</option>
                        <option value="2 Bedrooms">2 Bedrooms</option>
                        <option value="3 Bedrooms">3 Bedrooms</option>
                        <option value="4+ Bedrooms">4+ Bedrooms</option>
                    </select>

                    <label>Number of Bedrooms</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="e.g. 2"
                        value={bedrooms}
                        onChange={(event) => setBedrooms(event.target.value)}
                    />

                    <label>Number of Bathrooms</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="e.g. 2"
                        value={bathrooms}
                        onChange={(event) => setBathrooms(event.target.value)}
                    />

                    <label>Size (sqm)</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="e.g. 85"
                        value={size}
                        onChange={(event) => setSize(event.target.value)}
                    />

                    <label>Price (Ksh)</label>
                    <input
                        type="number"
                        min="0"
                        placeholder="e.g. 55000"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                    />

                    <label>Phone Number</label>
                    <input
                        type="tel"
                        placeholder="e.g. 0712345678"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />

                    <label>Description</label>
                    <textarea
                        rows="5"
                        placeholder="Describe the property..."
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    ></textarea>

                    <label>Amenities</label>
                    <div className="amenities-container">
                        <label>
                            <input
                                type="checkbox"
                                value="Parking"
                                checked={amenities.includes("Parking")}
                                onChange={handleAmenityChange}
                            />
                            Parking
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="Security"
                                checked={amenities.includes("Security")}
                                onChange={handleAmenityChange}
                            />
                            Security
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="Generator"
                                checked={amenities.includes("Generator")}
                                onChange={handleAmenityChange}
                            />
                            Generator
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="Balcony"
                                checked={amenities.includes("Balcony")}
                                onChange={handleAmenityChange}
                            />
                            Balcony
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="CCTV"
                                checked={amenities.includes("CCTV")}
                                onChange={handleAmenityChange}
                            />
                            CCTV
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                value="Others"
                                checked={amenities.includes("Others")}
                                onChange={handleAmenityChange}
                            />
                            Others
                        </label>

                        {amenities.includes("Others") && (
                            <textarea 
                                rows="3"
                                placeholder="Enter other amenities separated by commas. Eg: Swimming Pool, Gym, Garden"
                                value={otherAmenity}
                                onChange={(event) => setOtherAmenity(event.target.value)}
                            
                            />
                        )}
                    </div>

                    <label>Property Photos</label>
                    <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoChange}
                    />

                    {photos.length > 0 && (
                        <div className="photo-preview-container">
                            {photos.map((photo, index) => (
                                <div className="photo-preview" key={index}>
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt={`Property ${index + 1}`}
                                    />

                                    <button
                                        type="button"
                                        className="remove-photo-button"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            handleRemovePhoto(index);
                                        }}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button type="submit">
                        Post House
                    </button>

                    {successMessage && (
                        <p className="success-message">
                            {successMessage}
                        </p>
                    )}

                    {errorMessage && (
                        <p id="error-message">
                            {errorMessage}
                        </p>
                    )}

                </form>
            </div>

        </div>
    );
}

export default PostHouse;