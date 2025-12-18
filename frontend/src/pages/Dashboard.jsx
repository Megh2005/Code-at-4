import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, { withCredentials: true });
                setUser(data.user);
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        };
        fetchProfile();
    }, [navigate]);

    if (!user) return <div className="container center-content">Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="container">
                <header className="dashboard-header">
                    <h2>Welcome, {user.name}</h2>
                </header>

                <div className="dashboard-grid">
                    <div className="dashboard-card" onClick={() => navigate("/create-note")}>
                        <h3>✏️ Create Note</h3>
                        <p>Write down something new.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate("/notes")}>
                        <h3>📋 My Notes</h3>
                        <p>View all your saved notes.</p>
                    </div>
                    <div className="dashboard-card" onClick={() => navigate("/profile")}>
                        <h3>👤 My Profile</h3>
                        <p>Manage your account settings.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
