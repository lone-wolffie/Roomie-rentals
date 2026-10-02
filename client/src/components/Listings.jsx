// import { LISTINGS } from "../data/data.js";
import { useState, useEffect} from "react";

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

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

    if (loading) {
      return (
        <main className="listings-section" id="listings">
          <p>Loading Houses</p>
        </main>

      );
    }

    
  return (
    <main className="listings-section" id="listings">
      <div className="listings-grid">

        {listings.map((item) => (
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

                <button className="card-contact">
                  View
                </button>
              </div>

            </div>

          </div>
        ))}

      </div>
    </main>
  );
}

export default Listings;