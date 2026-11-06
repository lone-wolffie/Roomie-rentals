import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { API_URL } from "../config.js";

function OwnerDashboard() {
    const navigate = useNavigate();

    // display user's details on dashboard
    const [user] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Error retreiving user details:", error);
            return null;
        }
    });

    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Track the property selected for management and edit form
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    const availableAmenities = [
        "Parking",
        "Generator",
        "CCTV",
        "Security",
        "Balcony"
    ];

    // get properties for the logged-in owner
    useEffect(() => {
        const fetchOwnerProperties = async () => {
            if (!user?.id) {
                setIsLoading(false);
                setErrorMessage("Please log in to view your properties.");
                return;
            }

            try {
                setIsLoading(true);
                setErrorMessage("");

                const response = await fetch(`${API_URL}/api/users/${user.id}/properties`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setProperties(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching owner properties:", error);
                setErrorMessage("Unable to load your properties.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOwnerProperties();
    }, [user]);

    // log out the current user
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    // profile section
    const profileSection = (
        <section className="owner-profile">
            <div className="owner-profile-info">
                <div className="owner-profile-avatar">
                    {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                </div>

                <div className="owner-profile-details">
                    <h2>{user?.fullName || "User Account"}</h2>
                    <p>{user?.email || "Email not available"}</p>
                    <p>{user?.phoneNumber || "Phone number not available"}</p>
                </div>
            </div>

            <button 
                type="button"
                className="dashboard-logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>
        </section>
    );

    // format the date
    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "Date not available";
        }

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "Invalid date";
        }

        // convert format to dd/mm/yyyy
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    // edit form
    const handleEdit = () => {
        if (!selectedProperty) return;

        setEditForm({
            ...selectedProperty,
            amenities: Array.isArray(selectedProperty.amenities) ? [...selectedProperty.amenities] : [],
        });
        setErrorMessage("");
        setSuccessMessage("");
        setIsEditing(true);
    };

    // update the edit form fields
    const handleEditChange = (event) => {
        const { name, value } = event.target;

        setEditForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // save changes
    const handleSave = async (event) => {
        event.preventDefault();

        if (!editForm.id) {
            setErrorMessage("Property ID is missing");
            setSuccessMessage("");
            return;
        }

        const updatedProperty = {
            ...editForm,
            price: Number(editForm.price),
            bedrooms: Number(editForm.bedrooms),
            bathrooms: Number(editForm.bathrooms),
            size: Number(editForm.size),
        };

        try {
            setIsSaving(true);
            setErrorMessage("");
            setSuccessMessage("");

            const response = await fetch(`${API_URL}/api/properties/${updatedProperty.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProperty),
                }

            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // use property returned by backend
            const savedProperty = data.data;

            setProperties((previousProperties) =>
                previousProperties.map((property) =>
                    Number(property.id) === Number(savedProperty.id) ? savedProperty : property
                )
            );

            setSelectedProperty(savedProperty);
            setIsEditing(false);
            setEditForm({});

            setSuccessMessage("Property updated successfully.");
            setTimeout(() => {
                setSuccessMessage("");
            }, 2500);
        } catch (error) {
            console.error("Error updating property:", error);
            setErrorMessage("Unable to update property. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    // Cancel editing without saving changes
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditForm({});
        setErrorMessage("");
    };

    // Return to the property list
    const handleBackToDashboard = () => {
        setSelectedProperty(null);
        setIsEditing(false);
        setEditForm({});
    };

    // delete a property
    const handleDeleteProperty = async (propertyId) => {
        const propertyToDelete = properties.find(
            (property) => Number(property.id) === Number(propertyId)
        );

        if (!propertyToDelete) return;

        const confirmed = window.confirm(
            `Are you sure you want to delete "${propertyToDelete.title}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setErrorMessage("");
            setSuccessMessage("");

            const response = await fetch(`${API_URL}/api/properties/${propertyId}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setProperties((previousProperties) =>
                previousProperties.filter(
                    (property) => Number(property.id) !== Number(propertyId)
                )
            );

            setSelectedProperty(null);
            setIsEditing(false);
            setEditForm({});

            setErrorMessage("");
            setSuccessMessage("Property deleted successfully.");
        } catch (error) {
            console.error("Error deleting property:", error);
            setErrorMessage("Unable to delete property. Please try again.");
            setSuccessMessage("");
        }
    };

    if (selectedProperty) {
        return (
            <main className="owner-dashboard">
                {profileSection}

                {isEditing ? (
                    <section className="managed-property">
                        <h2>Edit Property</h2>
                        <p>Update the details of your house.</p>

                        <form className="edit-property-form" onSubmit={handleSave}>
                            <label>
                                Property Title
                                <input 
                                    type="text"
                                    name="title"
                                    value={editForm.title}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>

                            <label>
                                Region
                                <input
                                    type="text"
                                    name="region"
                                    value={editForm.region ?? ""}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>

                            <label>
                                Neighbourhood
                                <input
                                    type="text"
                                    name="neighbourhood"
                                    value={editForm.neighbourhood ?? ""}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>

                            <label>
                                Price (KSh)
                                <input
                                    type="number"
                                    name="price"
                                    min="1"
                                    value={editForm.price ?? ""}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>

                            <label>
                                Bedrooms
                                <input
                                    type="number"
                                    name="bedrooms"
                                    min="0"
                                    value={editForm.bedrooms ?? ""}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>

                            <label>
                                Bathrooms
                                <input
                                    type="number"
                                    name="bathrooms"
                                    min="0"
                                    value={editForm.bathrooms ?? ""}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>

                            <label>
                                Size (sqm)
                                <input
                                    type="number"
                                    name="size"
                                    min="1"
                                    value={editForm.size ?? ""}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>

                            <label>
                                Phone Number
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editForm.phone ?? ""}
                                    onChange={handleEditChange}
                                    required
                                />
                            </label>

                            <label className="edit-description">
                                Description
                                <textarea
                                    name="description"
                                    value={editForm.description ?? ""}
                                    onChange={handleEditChange}
                                    rows={5}
                                    required
                                />
                            </label>
                            
                            <div className="edit-amenities">
                                <span className="edit-amenities-title">Amenities</span>

                                <p>Select all amenities available at this property.</p>

                                <div className="edit-amenities-options">
                                    {availableAmenities.map((amenity) => (
                                        <label className="edit-amenity-option" key={amenity}>
                                            <input
                                                type="checkbox"
                                                checked={(editForm.amenities ?? []).includes(amenity)}
                                                onChange={(event) => {
                                                    const isChecked = event.target.checked;

                                                    setEditForm((previous) => ({
                                                        ...previous,
                                                        amenities: isChecked
                                                            ? [...(previous.amenities ?? []), amenity]
                                                            : (previous.amenities ?? []).filter(
                                                                (item) => item !== amenity
                                                            ),
                                                    }));
                                                }}
                                            />

                                            <span>{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>


                            <div className="edit-form-actions">
                                <button
                                    type="submit"
                                    className="dashboard-post-button"
                                    disabled={isSaving}
                                >
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className="dashboard-manage-button"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </section>
                ) : (
                    
                    <section className="dashboard-card">
                        <div className="managed-property">
                            <div className="header-details">
                                <h2>Property Management</h2>
                                <h3>{selectedProperty.title}</h3>
                            </div>

                            <button className="dashboard-manage-button"
                                onClick={handleBackToDashboard}
                            >
                                Back to Dashboard
                            </button>
                        </div>

                        <div className="edit-property-actions">
                            <button 
                                type="button"
                                className="dashboard-post-button"
                                onClick={handleEdit}
                            >
                                Edit Property
                            </button>

                            <button
                                type="button"
                                className="dashboard-delete-button"
                                onClick={() => handleDeleteProperty(selectedProperty.id)}
                            >
                                Delete Property
                            </button>
                        </div>

                        <hr />

                        <section className="managed-property-details">
                            <p>
                                <strong>Region</strong>{" "}
                                {selectedProperty.region}
                            </p>

                            <p>
                                <strong>Neighbourhood:</strong>{" "}
                                {selectedProperty.neighbourhood}
                            </p>

                            <p>
                                <strong>Price:</strong> KSh{" "}
                                {Number(selectedProperty.price || 0).toLocaleString()}
                            </p>

                            <p>
                                <strong>Bedrooms:</strong>{" "}
                                {selectedProperty.bedrooms}
                            </p>

                            <p>
                                <strong>Bathrooms:</strong>{" "}
                                {selectedProperty.bathrooms}
                            </p>

                            <p>
                                <strong>Size:</strong> 
                                {selectedProperty.size} sqm
                            </p>

                            <p>
                                <strong>Date posted:</strong>{" "}
                                {formatDate(selectedProperty.dateAdded)}
                            </p>

                            <p>
                                <strong>Description:</strong>{" "}
                                {selectedProperty.description}
                            </p>

                            <p>
                                <strong>Amenities:</strong>{" "}
                                {Array.isArray(selectedProperty.amenities) ? selectedProperty.amenities.join(", "): "Not specified"}
                            </p>

                            <p>
                                <strong>Contact:</strong>{" "}
                                {selectedProperty.phone}
                            </p>
                        </section>

                        {successMessage && (
                            <div className="success-message" role="status">
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="error-message" role="alert">
                                {errorMessage}
                            </div>
                        )}

                    </section>
                )}    
            </main>
        );
    }

    return (
        <main className="owner-dashboard">
            {profileSection}
            <section className="dashboard-card">
                <div className="dashboard-header">
                    <div className="header-details">
                        <h2>My Properties</h2>
                        <p>Review the status of your house listings.</p>
                    </div>

                    <button
                        className="dashboard-post-button"
                        onClick={() => {
                            navigate("/post-house");
                        }}
                    >
                        Post a House
                    </button>
                </div>
                <hr />

                <section className="dashboard-properties">
                    {isLoading ? (
                        <div className="dashboard-empty">
                            <p>Loading your properties...</p>
                        </div>
                    ) : errorMessage ? (
                        <div className="dashboard-empty">
                            <h3>Unable to load properties</h3>
                            <p>{errorMessage}</p>
                        </div>
                    ) : properties.length > 0 ? (
                        <div className="dashboard-property-list">
                            {properties.map((property) => (
                                <div className="dashboard-property-card" key={property.id}>
                                    <div className="dashboard-property-info">
                                        <h3>{property.title}</h3>

                                        <p>
                                            {property.region} · KSh{" "}
                                            {Number(property.price || 0).toLocaleString()}
                                            /month
                                        </p>

                                        <small>
                                            Posted on {formatDate(property.dateAdded)}
                                        </small>
                                    </div>

                                    <div className="dashboard-property-actions">
                                        <span
                                            className={`property-status ${
                                                property.status.toLowerCase()
                                            }`}
                                        >
                                            {property.status}
                                        </span>

                                        <button
                                            className="dashboard-manage-button"
                                            onClick={() => setSelectedProperty(property)}
                                        >
                                            Manage
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="dashboard-empty">
                            <h3>No properties yet</h3>
                            <p>
                                Post your first house to start managing your
                                listings.
                            </p>
                        </div>
                    )}
                </section>
            </section>
        </main>
    );
}

export default OwnerDashboard;
