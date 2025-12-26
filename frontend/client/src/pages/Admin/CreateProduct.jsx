import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const getCategories = async () => {
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
    getCategories();
  }, []);

  // Create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      if (image) productData.append("image", image);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("✅ Product Created Successfully!");
        resetForm();
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating product");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setImage(null);
    setShipping("");
  };

  return (
    <Layout title="Admin Panel - Create Product">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="admin-info-card p-4 shadow-sm rounded-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold brand-text m-0">
                  <i className="bi bi-box-seam-fill me-2"></i> Create New
                  Product
                </h2>
              </div>

              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div
                  className="card-header border-0 p-3"
                  style={{
                    background: "linear-gradient(135deg, #1a2a6c, #b21f1f)",
                    color: "white",
                  }}
                >
                  <p className="m-0 fw-bold small text-uppercase letter-spacing-1">
                    Product Specifications
                  </p>
                </div>
                <div className="card-body p-4 bg-light">
                  <form onSubmit={handleCreate}>
                    <div className="row">
                      {/* Left Side: Basic Info */}
                      <div className="col-lg-8">
                        <div className="mb-4">
                          <label className="form-label fw-600">
                            Product Title
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-3 py-2 px-3 shadow-none border"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter a descriptive product name"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label fw-600">
                            Overview / Description
                          </label>
                          <textarea
                            className="form-control rounded-3 p-3 shadow-none border"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your product features, dimensions, etc."
                            required
                          ></textarea>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <label className="form-label fw-600">
                              Price ($)
                            </label>
                            <div className="input-group">
                              <span className="input-group-text bg-white border-end-0">
                                $
                              </span>
                              <input
                                type="number"
                                className="form-control rounded-end-3 py-2 shadow-none border border-start-0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0.00"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <label className="form-label fw-600">
                              Inventory Quantity
                            </label>
                            <input
                              type="number"
                              className="form-control rounded-3 py-2 px-3 shadow-none border"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              placeholder="e.g. 50"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Options & Image */}
                      <div className="col-lg-4">
                        <div className="mb-4">
                          <label className="form-label fw-600">
                            Assign Category
                          </label>
                          <select
                            className="form-select rounded-3 py-2 shadow-none border"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            required
                          >
                            <option value="">Choose category...</option>
                            {categories.map((c) => (
                              <option key={c._id} value={c._id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="mb-4">
                          <label className="form-label fw-600">
                            Shipping Eligibility
                          </label>
                          <select
                            className="form-select rounded-3 py-2 shadow-none border"
                            onChange={(e) => setShipping(e.target.value)}
                            value={shipping}
                            required
                          >
                            <option value="">Select option...</option>
                            <option value="0">Local Pickup Only</option>
                            <option value="1">Available for Shipping</option>
                          </select>
                        </div>

                        <div className="mb-4">
                          <label className="form-label fw-600 d-block">
                            Display Image
                          </label>
                          <div className="image-upload-wrapper text-center p-4 border-dashed rounded-3 bg-white position-relative">
                            {image ? (
                              <div className="text-center">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt="product-preview"
                                  className="img-fluid rounded mb-2 shadow-sm"
                                  style={{ maxHeight: "150px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger rounded-circle position-absolute top-0 end-0 m-1"
                                  onClick={() => setImage(null)}
                                >
                                  <i className="bi bi-x"></i>
                                </button>
                                <p className="small text-muted m-0">
                                  {image.name}
                                </p>
                              </div>
                            ) : (
                              <label className="m-0 cursor-pointer w-100">
                                <i className="bi bi-cloud-arrow-up fs-1 text-primary d-block mb-2"></i>
                                <span className="small fw-bold text-primary">
                                  Upload Thumbnail
                                </span>
                                <input
                                  type="file"
                                  className="d-none"
                                  accept="image/*"
                                  onChange={(e) => setImage(e.target.files[0])}
                                  required
                                />
                                <p className="extra-small text-muted m-0 mt-2">
                                  JPG, PNG, WEBP max 1MB
                                </p>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-top mt-2 pt-4 d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary rounded-pill px-4"
                        onClick={resetForm}
                      >
                        Clear Form
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-5 fw-bold"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Generating...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check2-circle me-2"></i> Publish
                            Product
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fw-600 {
          font-weight: 600;
        }
        .letter-spacing-1 {
          letter-spacing: 1px;
        }
        .border-dashed {
          border: 2px dashed #dee2e6;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .extra-small {
          font-size: 0.75rem;
        }
        .image-upload-wrapper:hover {
          border-color: #667eea;
          background-color: #f8f9ff;
        }
      `}</style>
    </Layout>
  );
};

export default CreateProduct;
