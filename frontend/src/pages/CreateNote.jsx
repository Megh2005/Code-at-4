import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

const CreateNote = () => {
    const [note, setNote] = useState("");
    const navigate = useNavigate();

    const handleNoteSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/message/send", {
                message: note,
            }, { withCredentials: true });
            toast.success("Note created successfully!");
            setNote("");
            navigate("/notes"); // Redirect to notes list after creation
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create note");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h2 className="page-title">Create a New Note</h2>
                <div className="card">
                    <form onSubmit={handleNoteSubmit}>
                        <textarea
                            className="input-textarea"
                            rows="6"
                            placeholder="Write your thoughts here..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            required
                        ></textarea>
                        <div className="actions">
                            <button type="submit" className="btn primary">Save Note</button>
                            <button type="button" className="btn outline" onClick={() => navigate("/dashboard")}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateNote;
