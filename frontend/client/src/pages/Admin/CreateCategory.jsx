import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx"; // 🔹 Import your Layout wrapper

const CreateCategory = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // 🔹 Fetch all categories
    const getCategoryList = async () => {
        try {
            const res = await axios.get("/api/v1/category/get-category");
            if (res.data.success) {
                setCategories(res.data.category);
            }
        } catch (error) {
            toast.error("Error fetching categories");
        }
    };

    useEffect(() => {
        getCategoryList();
    }, []);

    // 🔹 Create category
    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim() || !description.trim()) return toast.error("All fields required");

        try {
            const res = await axios.post("/api/v1/category/create-category", { name, description });
            if (res.data.success) {
                toast.success("✅ Category created successfully!");
                setName("");
                setDescription("");
                getCategoryList();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error creating category");
        }
    };

    // 🔹 Update category
    const handleUpdate = async (id) => {
        if (!name.trim() || !description.trim()) return toast.error("All fields required");

        try {
            const res = await axios.put(`/api/v1/category/update-category/${id}`, { name, description });
            if (res.data.success) {
                toast.success("✏️ Category updated successfully!");
                setName("");
                setDescription("");
                setEditingCategory(null);
                getCategoryList();
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Error updating category");
        }
    };

    // 🔹 Delete category (toast warning instead of confirm)
    const handleDelete = async (id) => {
        toast.warn(
            <div>
                <p>⚠️ Are you sure you want to delete this category?</p>
                <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={async () => {
                        try {
                            const res = await axios.delete(`/api/v1/category/delete-category/${id}`);
                            if (res.data.success) {
                                toast.success("🗑️ Category deleted successfully!");
                                getCategoryList();
                            } else {
                                toast.error(res.data.message);
                            }
                        } catch (error) {
                            toast.error("Error deleting category");
                        }
                    }}
                >
                    Yes, Delete
                </button>
                <button className="btn btn-sm btn-secondary" onClick={() => toast.dismiss()}>
                    Cancel
                </button>
            </div>,
            { autoClose: false }
        );
    };

    // 🔹 Get single category by slug
    const getSingleCategory = async (slug) => {
        try {
            const res = await axios.get(`/api/v1/category/single-category/${slug}`);
            if (res.data.success) {
                setSelectedCategory(res.data.category);
            }
        } catch (error) {
            toast.error("Error fetching single category");
        }
    };

    return (
        <Layout title="Admin Panel - Manage Categories">
            <div className="container-fluid py-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>

                    {/* Main content */}
                    <div className="col-md-9">
                        <div className="card shadow-lg border-0">
                            <div className="card-header bg-primary fw-bold text-white">
                                📂 Manage Categories
                            </div>
                            <div className="card-body">
                                {/* Form */}
                                <form
                                    onSubmit={
                                        editingCategory
                                            ? (e) => {
                                                e.preventDefault();
                                                handleUpdate(editingCategory._id);
                                            }
                                            : handleCreate
                                    }
                                >
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Category Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter category name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Description</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter category description"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-success w-100 rounded-pill">
                                        {editingCategory ? "✏️ Update Category" : "➕ Create Category"}
                                    </button>
                                </form>

                                {/* Category List */}
                                <hr />
                                <h5 className="mt-4 fw-bold">Existing Categories</h5>
                                <ul className="list-group">
                                    {categories.map((cat) => (
                                        <li
                                            key={cat._id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <div>
                                                <strong>{cat.name}</strong> <br />
                                                <small className="text-muted">{cat.description}</small>
                                            </div>
                                            <div className="btn-group">
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() => getSingleCategory(cat.slug)}
                                                >
                                                    👁️ View
                                                </button>
                                                <button
                                                    className="btn btn-outline-warning btn-sm"
                                                    onClick={() => {
                                                        setEditingCategory(cat);
                                                        setName(cat.name);
                                                        setDescription(cat.description);
                                                    }}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDelete(cat._id)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Single Category Display */}
                                {selectedCategory && (
                                    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title fw-bold">{selectedCategory.name}</h5>
                                                    <button type="button" className="btn-close" onClick={() => setSelectedCategory(null)}></button>
                                                </div>
                                                <div className="modal-body">
                                                    <p><strong>Name:</strong> {selectedCategory.name}</p>
                                                    <p><strong>Description:</strong> {selectedCategory.description}</p>
                                                    <p><strong>Slug:</strong> {selectedCategory.slug}</p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedCategory(null)}>Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
