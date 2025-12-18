import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const EditNote = () => {
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                // Since we don't have a specific get-one endpoint, we fetch all and find the one. 
                // ideally backend should have get/:id, but this works for now given the current user constraints.
                const { data } = await axios.get("http://localhost:5000/api/message/getall", {
                    withCredentials: true,
                });
                const foundNote = data.messages.find(msg => msg._id === id);
                if (foundNote) {
                    setNote(foundNote.message);
                } else {
                    toast.error("Note not found");
                    navigate("/notes");
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch note");
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/message/update/${id}`, { message: note }, { withCredentials: true });
            toast.success("Note updated successfully");
            navigate("/notes");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update note");
        }
    };

    if (loading) return <div className="container center-content">Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="container">
                <h2 className="page-title">Edit Note</h2>
                <div className="card">
                    <form onSubmit={handleUpdate}>
                        <textarea
                            className="input-textarea"
                            placeholder="Write your note here..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            required
                        ></textarea>
                        <button type="submit" className="btn primary">Update Note</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditNote;
