import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx"; // 🔹 Import Layout

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 🔹 Fetch categories
    const getCategories = async () => {
        try {
            const res = await axios.get("/api/v1/category/get-category");
            if (res.data.success) setCategories(res.data.category);
        } catch {
            toast.error("Error fetching categories");
        }
    };

    // 🔹 Fetch products
    const getProducts = async () => {
        try {
            const res = await axios.get("/api/v1/product/get-products");
            if (res.data.success) setProducts(res.data.products);
        } catch {
            toast.error("Error fetching products");
        }
    };

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    // 🔹 Create product
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("shipping", shipping);
            if (image) formData.append("image", image);

            const res = await axios.post("/api/v1/product/create-product", formData);
            if (res.data.success) {
                toast.success("✅ Product created!");
                resetForm();
                getProducts();
            } else toast.error(res.data.message);
        } catch {
            toast.error("Error creating product");
        }
    };

    // 🔹 Update product
    const handleUpdate = async (id) => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("shipping", shipping);
            if (image) formData.append("image", image);

            const res = await axios.put(`/api/v1/product/update-product/${id}`, formData);
            if (res.data.success) {
                toast.success("✏️ Product updated!");
                resetForm();
                setEditingProduct(null);
                getProducts();
            } else toast.error(res.data.message);
        } catch {
            toast.error("Error updating product");
        }
    };

    // 🔹 Delete product
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/v1/product/delete-product/${id}`);
            if (res.data.success) {
                toast.success("🗑️ Product deleted!");
                getProducts();
            } else toast.error(res.data.message);
        } catch {
            toast.error("Error deleting product");
        }
    };

    // 🔹 Reset form
    const resetForm = () => {
        setName(""); setDescription(""); setPrice(""); setCategory(""); setQuantity(""); setShipping(""); setImage(null);
    };

    return (
        <Layout title="Admin Panel - Manage Products">
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-md-3"><AdminMenu /></div>
                    <div className="col-md-9">
                        <div className="card shadow-lg border-0">
                            <div className="card-header bg-primary text-white fw-bold">📦 Manage Products</div>
                            <div className="card-body">
                                {/* Form */}
                                <form
                                    onSubmit={editingProduct ? (e) => { e.preventDefault(); handleUpdate(editingProduct._id); } : handleCreate}
                                >
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Product Name</label>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Description</label>
                                        <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Price</label>
                                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Category</label>
                                        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                            <option value="">Select category</option>
                                            {categories.map((cat) => (
                                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Quantity</label>
                                        <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Shipping</label>
                                        <select className="form-select" value={shipping} onChange={(e) => setShipping(e.target.value)}>
                                            <option value="">Select Shipping</option>
                                            <option value="0">No</option>
                                            <option value="1">Yes</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Upload Image</label>
                                        <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                                        {image && <img src={URL.createObjectURL(image)} alt="preview" className="mt-2" height="100" />}
                                    </div>
                                    <button type="submit" className="btn btn-success w-100 rounded-pill">
                                        {editingProduct ? "✏️ Update Product" : "➕ Create Product"}
                                    </button>
                                </form>

                                {/* Product List */}
                                <hr />
                                <h5 className="mt-4 fw-bold">Existing Products</h5>
                                <ul className="list-group">
                                    {products.map((prod) => (
                                        <li key={prod._id} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{prod.name}</strong> <br />
                                                <small className="text-muted">{prod.description}</small>
                                            </div>
                                            <div className="btn-group">
                                                <button className="btn btn-outline-primary btn-sm" onClick={() => setSelectedProduct(prod)}>👁️ View</button>
                                                <button className="btn btn-outline-warning btn-sm" onClick={() => {
                                                    setEditingProduct(prod);
                                                    setName(prod.name);
                                                    setDescription(prod.description);
                                                    setPrice(prod.price);
                                                    setCategory(prod.category?._id || "");
                                                    setQuantity(prod.quantity);
                                                    setShipping(prod.shipping ? "1" : "0");
                                                }}>✏️ Edit</button>
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(prod._id)}>🗑️ Delete</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {/* Single Product Display Modal */}
                                {selectedProduct && (
                                    <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                        <div className="modal-dialog modal-dialog-centered modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title fw-bold">{selectedProduct.name}</h5>
                                                    <button type="button" className="btn-close" onClick={() => setSelectedProduct(null)}></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="row">
                                                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                                                            <img
                                                                src={`/api/v1/product/product-photo/${selectedProduct._id}`}
                                                                alt={selectedProduct.name}
                                                                className="img-fluid rounded shadow-sm"
                                                                style={{ maxHeight: "300px" }}
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h4 className="fw-bold">{selectedProduct.name}</h4>
                                                            <p className="text-muted">{selectedProduct.description}</p>
                                                            <hr />
                                                            <p><strong>Price:</strong> ${selectedProduct.price}</p>
                                                            <p><strong>Category:</strong> {selectedProduct.category?.name}</p>
                                                            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                                                            <p><strong>Shipping:</strong> {selectedProduct.shipping ? "Yes" : "No"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>Close</button>
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

export default CreateProduct;
