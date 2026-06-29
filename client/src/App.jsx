import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import FilterBar from "./components/FilterBar.jsx";
import Listings from "./components/Listings.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      < FilterBar/>
      <Listings />
    </>
  );
}

export default App;
