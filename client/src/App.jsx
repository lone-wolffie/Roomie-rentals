import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx"; 
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Listings from "./components/Listings.jsx";
import PostHouse from "./pages/PostHouse.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/post-house" element={<PostHouse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
