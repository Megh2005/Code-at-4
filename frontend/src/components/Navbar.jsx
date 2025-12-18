import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/logout`, { withCredentials: true });
            toast.success("Logged out successfully");
            navigate("/");
        } catch (error) {
            toast.error("Logout failed");
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/dashboard" className="navbar-brand">
                    Note @ Ease
                </Link>
                <div className="navbar-links">
                    <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}>
                        Dashboard
                    </Link>
                    <Link to="/notes" className={`nav-link ${isActive("/notes") ? "active" : ""}`}>
                        Notes
                    </Link>
                    <Link to="/profile" className={`nav-link ${isActive("/profile") ? "active" : ""}`}>
                        Profile
                    </Link>
                    <button className="nav-btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
