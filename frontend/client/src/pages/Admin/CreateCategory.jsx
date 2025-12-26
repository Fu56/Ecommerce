import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const getCategoryList = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/category/get-category");
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      toast.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  // Create category
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim())
      return toast.error("All fields required");

    try {
      const res = await axios.post("/api/v1/category/create-category", {
        name,
        description,
      });
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

  // Update category
  const handleUpdate = async (id) => {
    if (!name.trim() || !description.trim())
      return toast.error("All fields required");

    try {
      const res = await axios.put(`/api/v1/category/update-category/${id}`, {
        name,
        description,
      });
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

  // Delete category
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Are you sure you want to delete this category?")) {
      try {
        const res = await axios.delete(
          `/api/v1/category/delete-category/${id}`
        );
        if (res.data.success) {
          toast.success("🗑️ Category deleted successfully!");
          getCategoryList();
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Error deleting category");
      }
    }
  };

  return (
    <Layout title="Admin Panel - Manage Categories">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div className="admin-info-card p-4 shadow-sm rounded-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold brand-text m-0">
                  <i className="bi bi-folder-plus me-2"></i> Manage Categories
                </h2>
                <span className="badge bg-primary px-3 py-2">
                  {categories.length} Categories
                </span>
              </div>

              {/* Form Section */}
              <div className="card border-0 shadow-sm rounded-4 mb-5 overflow-hidden">
                <div
                  className="card-header border-0 p-3"
                  style={{
                    background: "linear-gradient(135deg, #1a2a6c, #b21f1f)",
                    color: "white",
                  }}
                >
                  <h6 className="m-0 fw-bold">
                    {editingCategory ? "Update Category" : "Add New Category"}
                  </h6>
                </div>
                <div className="card-body p-4 bg-light">
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
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-600">
                          Category Name
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-pill px-3 shadow-none"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Electronics"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-600">Description</label>
                        <input
                          type="text"
                          className="form-control rounded-pill px-3 shadow-none"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Short description..."
                        />
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-4 fw-bold"
                      >
                        {editingCategory ? "Update Category" : "Save Category"}
                      </button>
                      {editingCategory && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary rounded-pill px-4"
                          onClick={() => {
                            setEditingCategory(null);
                            setName("");
                            setDescription("");
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Category Table Section */}
              <div className="table-responsive">
                <table className="table table-hover align-middle custom-table">
                  <thead className="table-light">
                    <tr>
                      <th className="px-4 py-3">Category Name</th>
                      <th className="py-3">Description</th>
                      <th className="py-3">Slug</th>
                      <th className="text-end px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center py-5">
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : categories.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-5 text-muted">
                          No categories found.
                        </td>
                      </tr>
                    ) : (
                      categories.map((c) => (
                        <tr key={c._id} className="category-row">
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-3 bg-light text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold">
                                {c.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="fw-600">{c.name}</span>
                            </div>
                          </td>
                          <td className="py-3 text-muted small">
                            {c.description}
                          </td>
                          <td className="py-3">
                            <code className="bg-light px-2 py-1 rounded">
                              {c.slug}
                            </code>
                          </td>
                          <td className="text-end px-4 py-3">
                            <div className="btn-group shadow-sm rounded-pill overflow-hidden border">
                              <button
                                className="btn btn-white btn-sm border-0 px-3 hover-warning"
                                title="Edit"
                                onClick={() => {
                                  setEditingCategory(c);
                                  setName(c.name);
                                  setDescription(c.description);
                                }}
                              >
                                <i className="bi bi-pencil-square text-warning"></i>
                              </button>
                              <button
                                className="btn btn-white btn-sm border-0 px-3 hover-danger"
                                title="Delete"
                                onClick={() => handleDelete(c._id)}
                              >
                                <i className="bi bi-trash-fill text-danger"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fw-600 {
          font-weight: 600;
        }
        .custom-table {
          border-collapse: separate;
          border-spacing: 0 8px;
        }
        .category-row {
          transition: all 0.3s;
        }
        .category-row:hover {
          background-color: #f8f9fa !important;
          transform: scale(1.01);
        }
        .avatar-sm {
          width: 32px;
          height: 32px;
          font-size: 14px;
        }
        .hover-warning:hover {
          background-color: #fff3cd !important;
        }
        .hover-danger:hover {
          background-color: #f8d7da !important;
        }
      `}</style>
    </Layout>
  );
};

export default CreateCategory;
