import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Check if user is already logged in by trying to fetch profile
                await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, { withCredentials: true });
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin
            ? `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`
            : `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`;

        try {
            const { data } = await axios.post(url, formData, { withCredentials: true }); // Ensure cookies are set
            toast.success(data.message);
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    if (loading) return <div className="container center-content">Loading...</div>;

    if (isAuthenticated) {
        return (
            <div className="container center-content">
                <h2>Welcome Back!</h2>
                <p style={{ marginBottom: "20px", color: "#666" }}>You are already logged in.</p>
                <button className="btn primary" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
            </div>
        );
    }

    return (
        <div className="container center-content">
            <h1 className="auth-title">Welcome</h1>
            <div className="card">
                <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>{isLogin ? "Login" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="btn primary">{isLogin ? "Login" : "Sign Up"}</button>
                </form>
                <p className="link" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default Auth;
