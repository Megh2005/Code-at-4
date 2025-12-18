import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/api/message/getall", {
                withCredentials: true,
            });
            setNotes(data.messages);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch notes");
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/message/delete/${id}`, { withCredentials: true });
            toast.success("Note deleted");
            fetchNotes(); // Refresh list
        } catch (error) {
            toast.error("Failed to delete note");
        }
    };

    const handleEdit = (note) => {
        navigate(`/edit-note/${note._id}`);
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="header-row">
                    <h2 className="page-title">My Notes</h2>
                    <button className="btn primary small" onClick={() => navigate("/create-note")}>+ New Note</button>
                </div>

                <div className="notes-grid">
                    {notes && notes.length > 0 ? (
                        notes.map((note) => (
                            <div key={note._id} className="note-card">
                                <p className="note-content">{note.message}</p>
                                <div className="note-footer">
                                    <small>{note.createdAt ? new Date(note.createdAt).toLocaleString("en-IN", {
                                        timeZone: "Asia/Kolkata",
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    }) : "Just now"}</small>
                                    <div className="note-actions">
                                        <button className="icon-btn" onClick={() => handleEdit(note)}>Edit</button>
                                        <button className="icon-btn delete" onClick={() => handleDelete(note._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <p>No notes found.</p>
                            <button className="btn primary" onClick={() => navigate("/create-note")}>Create your first note</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Notes;
