import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Listings from "../components/Listings.jsx";
import Footer from "../components/Footer.jsx";

import { useState } from "react";

function Home() {
  // to store the search filters
  const [filters, setFilters] = useState({
    region: "All Regions",
    type: "Any Type",
    price: "Any Price"
  });

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  const [sortBy, setSortBy] = useState("newest");
  const handleSortChange = (selectedSort) => {
    setSortBy(selectedSort);
  }

  return (
    <>
      <Navbar />
      <Hero onSearch={handleSearch} />
      <FilterBar onSortChange={handleSortChange} />
      <Listings  filters={filters} sortBy={sortBy} />
      <Footer />
    </>
  );
}

export default Home;