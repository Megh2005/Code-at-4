import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: "", email: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, { withCredentials: true });
                setUser(data.user);
                setEditData({ name: data.user.name, email: data.user.email });
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch profile");
                navigate("/");
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleEditClick = () => {
        setEditData({ name: user.name, email: user.email });
        setIsEditing(true);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
                name: editData.name,
                email: editData.email
            }, { withCredentials: true });

            toast.success("Profile updated");
            setUser({ ...user, name: editData.name, email: editData.email });
            setIsEditing(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure? This cannot be undone.")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, { withCredentials: true });
            toast.success("Account deleted");
            navigate("/");
        } catch (error) {
            toast.error("Failed to delete account");
        }
    };

    if (!user) return <div className="container center-content">Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="container">
                <h2 className="page-title">My Profile</h2>

                <div className="card">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="profile-details">
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3>Personal Information</h3>
                        <div className="info-group">
                            <div className="info-row">
                                <span className="info-label">Full Name</span>
                                <span className="info-value">{user.name}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Email Address</span>
                                <span className="info-value">{user.email}</span>
                            </div>
                        </div>
                        <button className="btn secondary" onClick={handleEditClick} style={{ marginTop: '1rem' }}>
                            Update Information
                        </button>
                    </div>

                    <div className="profile-section">
                        <h3>Danger Zone</h3>
                        <div className="danger-zone">
                            <p>Once you delete your account, there is no going back. Please be certain.</p>
                            <button className="btn danger" onClick={handleDeleteAccount}>Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="modal-overlay" onClick={() => setIsEditing(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Update Profile</h3>
                            <button className="modal-close" onClick={() => setIsEditing(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleUpdateProfile}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={editData.name}
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={editData.email}
                                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                required
                            />
                            <div className="modal-actions">
                                <button type="button" className="btn secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button type="submit" className="btn primary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
