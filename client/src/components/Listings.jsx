import { LISTINGS } from "../data/data.js";

function Listings() {
  return (
    <main className="listings-section">
      <div className="listings-grid">

        {LISTINGS.map((item) => (
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