import { useNavigate } from "react-router-dom";
import { useState } from "react";

function OwnerDashboard() {
    const navigate = useNavigate();

    // Temporary sample 
    const [properties, setProperties] = useState([
        {
            id: 1,
            title: "Bedsitter in Roysambu",
            region: "Nairobi",
            neighbourhood: "Roysambu",
            price: 8000,
            bedrooms: 0,
            bathrooms: 1,
            size: 25,
            description: "A comfortable bedsitter in a convenient location.",
            amenities: ["Water", "Electricity"],
            phone: "0712345678",
            status: "Pending",
            dateAdded: "2026-10-15",
        },
        {
            id: 2,
            title: "One-bedroom in Kasarani",
            region: "Nairobi",
            neighbourhood: "Kasarani",
            price: 12000,
            bedrooms: 1,
            bathrooms: 1,
            size: 40,
            description: "A spacious one-bedroom house near essential services.",
            amenities: ["Water", "Parking"],
            phone: "0723456789",
            status: "Approved",
            dateAdded: "2026-10-12",
        },
        {
            id: 3,
            title: "Two-bedroom in Juja",
            region: "Kiambu",
            neighbourhood: "Juja",
            price: 18000,
            bedrooms: 2,
            bathrooms: 1,
            size: 65,
            description: "A two-bedroom house suitable for a small family.",
            amenities: ["Water", "Security", "Parking"],
            phone: "0734567890",
            status: "Approved",
            dateAdded: "2026-10-10",
        },
    ]);

    // Track the property selected for management and edit form
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});

    // edit form
    const handleEdit = () => {
        setEditForm({
            ...selectedProperty,
            amenities: [...selectedProperty.amenities],
        });

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
    const handleSave = (event) => {
        event.preventDefault();

        const updatedProperty = {
            ...editForm,
            price: Number(editForm.price),
            bedrooms: Number(editForm.bedrooms),
            bathrooms: Number(editForm.bathrooms),
            size: Number(editForm.size),
        };

        setProperties((previousProperties) =>
            previousProperties.map((property) =>
                property.id === updatedProperty.id ? updatedProperty : property
            )
        );

        setSelectedProperty(updatedProperty);
        setIsEditing(false);
    };

    // Cancel editing without saving changes
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditForm({});
    };

    // Return to the property list
    const handleBackToDashboard = () => {
        setSelectedProperty(null);
        setIsEditing(false);
        setEditForm({});
    };

    if (selectedProperty) {
        return (
            <main className="owner-dashboard">
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

                            <div className="edit-form-actions">
                                <button
                                    type="submit"
                                    className="dashboard-post-button"
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
                    <> 
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

                            <button className="dashboard-post-button"
                                onClick={handleEdit}
                            >
                                Edit Property
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
                                {selectedProperty.price.toLocaleString()}
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
                                {selectedProperty.dateAdded}
                            </p>

                            <p>
                                <strong>Description:</strong>{" "}
                                {selectedProperty.description}
                            </p>

                            <p>
                                <strong>Amenities:</strong>{" "}
                                {selectedProperty.amenities.join(", ")}
                            </p>

                            <p>
                                <strong>Contact:</strong>{" "}
                                {selectedProperty.phone}
                            </p>
                        </section>
                    </>
                )}    
            </main>
        );
    }

    return (
        <main className="owner-dashboard">
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
                {properties.length > 0 ? (
                    <div className="dashboard-property-list">
                        {properties.map((property) => (
                            <div className="dashboard-property-card" key={property.id}>
                                <div className="dashboard-property-info">
                                    <h3>{property.title}</h3>

                                    <p>
                                        {property.region} · KSh{" "}
                                        {property.price.toLocaleString()}
                                        /month
                                    </p>

                                    <small>
                                        Posted on {property.dateAdded}
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
        </main>
    );
}

export default OwnerDashboard;
