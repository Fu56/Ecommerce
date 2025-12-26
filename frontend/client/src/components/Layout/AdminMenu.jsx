import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";

const AdminMenu = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="admin-menu-container">
      <h4 className="fw-bold mb-4 text-center" style={{ color: "#1a2a6c" }}>
        <i className="bi bi-shield-lock-fill me-2"></i> Admin Panel
      </h4>
      <div className="list-group admin-menu-list">
        <NavLink
          to="/dashboard/admin"
          end
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center ${
              isActive ? "active" : ""
            }`
          }
        >
          <i className="bi bi-speedometer2 me-3 text-primary"></i> Dashboard
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-category"
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center ${
              isActive ? "active" : ""
            }`
          }
        >
          <i className="bi bi-folder-plus me-3 text-warning"></i> Create
          Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center ${
              isActive ? "active" : ""
            }`
          }
        >
          <i className="bi bi-box-seam me-3 text-success"></i> Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center ${
              isActive ? "active" : ""
            }`
          }
        >
          <i className="bi bi-grid-fill me-3 text-purple"></i> Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className={({ isActive }) =>
            `list-group-item list-group-item-action d-flex align-items-center ${
              isActive ? "active" : ""
            }`
          }
        >
          <i className="bi bi-people-fill me-3 text-info"></i> Users
        </NavLink>

        <button
          onClick={handleLogout}
          className="list-group-item list-group-item-action d-flex align-items-center mt-4 text-danger border-danger"
          style={{ background: "rgba(220, 53, 69, 0.05)" }}
        >
          <i className="bi bi-box-arrow-right me-3"></i> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;
