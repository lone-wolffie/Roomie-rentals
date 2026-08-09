import "../login.css";

function PostHouse() {
  return (
    <div className="main-container">

      <h2>Post a House</h2>

        <div className="post-house-container">
            <p>List a property you would like to sell or rent</p>

            <form className="post-house-form">
                <label>Property Title</label>
                <input
                    type="text"
                    placeholder="e.g. 2 Bedroom Apartment, Kilimani"
                />

                <label>Region</label>
                <select>
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
                />

                <label>House Type</label>
                <select>
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
                />

                <label>Number of Bathrooms</label>
                <input
                    type="number"
                    min="0"
                    placeholder="e.g. 2"
                />

                <label>Size (sqm)</label>
                <input
                    type="number"
                    min="0"
                    placeholder="e.g. 85"
                />

                <label>Monthly Rent (Ksh)</label>
                <input
                    type="number"
                    min="0"
                    placeholder="e.g. 55000"
                />

                <label>Phone Number</label>
                <input
                    type="tel"
                    placeholder="e.g. 0712345678"
                />

                <label>Description</label>
                <textarea
                    rows="5"
                    placeholder="Describe the property..."
                ></textarea>

                <label>Property Photos</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                />

                <button type="submit">
                    Post House
                </button>

            </form>
        </div>

    </div>
  );
}

export default PostHouse;