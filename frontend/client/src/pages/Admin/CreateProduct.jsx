import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) return toast.error("Product name is required");
        if (name.length < 3) return toast.error("Product name must be at least 3 characters");
        if (!description.trim()) return toast.error("Description is required");
        if (!price || price <= 0) return toast.error("Price must be greater than 0");
        if (!category) return toast.error("Please select a category");
        if (!image) return toast.error("Product image is required");

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("image", image);

            const res = await axios.post("/api/v1/product/create", formData);
            if (res.data.success) {
                toast.success("Product created successfully!");
                setName(""); setDescription(""); setPrice(""); setCategory(""); setImage(null);
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
                            📦 Create Product
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${!name.trim() ? "is-invalid" : "is-valid"}`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter product name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className={`form-control ${!description.trim() ? "is-invalid" : "is-valid"}`}
                                        rows="3"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter product description"
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className={`form-control ${!price ? "is-invalid" : "is-valid"}`}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter product price"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <select
                                        className={`form-select ${!category ? "is-invalid" : "is-valid"}`}
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="">Select category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="fashion">Fashion</option>
                                        <option value="grocery">Grocery</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Upload Image</label>
                                    <input
                                        type="file"
                                        className={`form-control ${!image ? "is-invalid" : "is-valid"}`}
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                                <button type="submit" className="btn btn-success w-100">
                                    Create Product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
