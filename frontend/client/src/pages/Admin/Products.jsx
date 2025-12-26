import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/product/get-products");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Delete product
  const handleDelete = async (pid) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${pid}`
      );
      if (data.success) {
        toast.success("Product deleted successfully");
        getAllProducts();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  return (
    <Layout title="Products - Admin Dashboard">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="admin-info-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h2
                  className="fw-bold brand-text m-0 mb-2 mb-md-0"
                  style={{ fontSize: "2rem" }}
                >
                  <i className="bi bi-grid-fill me-2"></i> All Products
                </h2>
                <div>
                  <span className="badge bg-primary fs-6 px-3 py-2 me-2">
                    {products.length} Products
                  </span>
                  <button
                    className="btn btn-success rounded-pill px-4"
                    onClick={() => navigate("/dashboard/admin/create-product")}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Product
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox fs-1 d-block mb-3 text-muted"></i>
                  <h4 className="text-muted">No products found</h4>
                  <p className="text-muted">
                    Create your first product to get started
                  </p>
                  <button
                    className="btn btn-primary rounded-pill px-4 mt-3"
                    onClick={() => navigate("/dashboard/admin/create-product")}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Create Product
                  </button>
                </div>
              ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                  {products.map((p) => (
                    <div className="col" key={p._id}>
                      <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card">
                        <div className="position-relative">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            style={{
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="position-absolute top-0 end-0 m-2">
                            <span className="badge bg-light text-dark border">
                              {p.category?.name || "Uncategorized"}
                            </span>
                          </div>
                        </div>

                        <div className="card-body">
                          <h5 className="card-title fw-bold mb-2">{p.name}</h5>
                          <p className="card-text text-muted small mb-3">
                            {p.description.substring(0, 60)}...
                          </p>

                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="brand-text fw-bold fs-4">
                              ${p.price}
                            </div>
                            <span
                              className={`badge ${
                                p.quantity > 0 ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {p.quantity > 0
                                ? `${p.quantity} in stock`
                                : "Out of stock"}
                            </span>
                          </div>

                          <div className="d-grid gap-2">
                            <button
                              className="btn btn-outline-primary btn-sm rounded-pill"
                              onClick={() =>
                                navigate(`/dashboard/admin/product/${p.slug}`)
                              }
                            >
                              <i className="bi bi-pencil-square me-1"></i>
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm rounded-pill"
                              onClick={() => handleDelete(p._id)}
                            >
                              <i className="bi bi-trash me-1"></i>
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
