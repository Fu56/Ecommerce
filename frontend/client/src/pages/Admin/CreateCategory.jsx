import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";

const CreateCategory = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) return toast.error("Category name is required");
        if (name.length < 3) return toast.error("Category name must be at least 3 characters");
        if (!description.trim()) return toast.error("Description is required");

        try {
            const res = await axios.post("/api/v1/category/create", { name, description });
            if (res.data.success) {
                toast.success("Category created successfully!");
                setName(""); setDescription("");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <AdminMenu />
                </div>

                {/* Main content */}
                <div className="col-md-9">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white fw-bold">
                            📂 Create Category
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label className="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${!name.trim() ? "is-invalid" : "is-valid"}`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter category name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className={`form-control ${!description.trim() ? "is-invalid" : "is-valid"}`}
                                        rows="3"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter category description"
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-success w-100">
                                    Create Category
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCategory;
