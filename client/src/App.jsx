import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import FilterBar from "./components/FilterBar.jsx";
import Listings from "./components/Listings.jsx";
import Footer from "./components/Footer.jsx";

import Login from "./pages/Login.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      < FilterBar/>
      <Listings />
      <Footer />
      <Login />
    </>
  );
}

export default App;
