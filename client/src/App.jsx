import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home.jsx"; 
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Listings from "./components/Listings.jsx";
import PostHouse from "./pages/PostHouse.jsx";
import OwnerDashboard from "./components/OwnerDashboard.jsx";

// protect pages that require a signed-in user
function ProtectedRoute({ children }) {
    const location = useLocation();

    let user = null;

    try {
        const savedUser = localStorage.getItem("user");
        user = savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
        console.error("Error reading user details:", error);
    }

    // redirect to login if no user is signed in
    if (!user || !user.id) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/listings" element={<Listings />} />
                <Route 
                    path="/post-house" 
                    element={
                        <ProtectedRoute>
                            <PostHouse />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/owner-dashboard" 
                    element={
                        <ProtectedRoute>
                            <OwnerDashboard />
                        </ProtectedRoute>     
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
