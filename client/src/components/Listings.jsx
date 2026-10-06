// import { LISTINGS } from "../data/data.js";
import PropertyDetails from "./PropertyDetails.jsx";
import { useState, useEffect} from "react";

function Listings({ filters }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/properties")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        return response.json();
      })
       .then((data) => {
        setListings(data);
        setLoading(false);
       })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
    }, []);

    const handleView = (item) => {
      setSelectedProperty(item);
    };

    if (loading) {
      return (
        <main className="listings-section" id="listings">
          <p>Loading Houses</p>
        </main>

      );
    }

    // filter the houses based on the search filters
    const filteredListings = listings.filter((item) => {

      // filter by region
      const matchesRegion = filters.region === "All Regions" || item.region === filters.region;
      // filter by type
      const matchesType = filters.type === "Any Type" || item.type === filters.type;
      // filter by price
      let matchesPrice = true;
      if (filters.price !== "Any Price") {
        const selectedPrice = Number(filters.price);
        const propertyPrice = Number(String(item.price).replace(/,/g, '')); // Remove commas and convert to number

        matchesPrice = propertyPrice < selectedPrice;
      }

      return matchesRegion && matchesType && matchesPrice;
    });

    if (selectedProperty) {
      return (
        <PropertyDetails 
            property={selectedProperty}
            onBack={() => setSelectedProperty(null)}
        />
      );
    }


  return (
    <main className="listings-section" id="listings">
      <div className="listings-grid">

        {filteredListings.length > 0 ? (
          filteredListings.map((item) => (
            <div className="property-card" key={item.id}>

              <div className="card-image">
                <img src={item.photos[0]} alt={item.title} />
              </div>

              <div className="card-body">

                <div className="card-region">
                  {item.region}
                </div>

                <div className="card-title">
                  {item.title}
                </div>

                <div className="card-meta">
                  <span>{item.bedrooms} bedroom(s)</span>
                  <span>{item.bathrooms} bathroom(s)</span>
                  <span>{item.size} sqm</span>
                </div>

                <div className="card-footer">
                  <div className="card-price">
                    Ksh {item.price}
                  </div>

                
                  <button className="card-contact"
                    onClick={() => handleView(item)}
                  >
                    View
                  </button>
                </div>

              </div>

            </div>
          ))
        ) : (
          <div className="empty-results">
            <div className="empty-icon">🏠</div>

            <h3>No houses found</h3>
            <p> We couldn't find any houses matching your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Listings;