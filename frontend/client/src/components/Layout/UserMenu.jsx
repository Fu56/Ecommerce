import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.jsx";

const UserMenu = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="user-menu-container">
      {/* User Profile Card */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
        <div
          className="card-body text-center p-4"
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
          }}
        >
          <div
            className="user-avatar mx-auto mb-3"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              border: "3px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            {auth?.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h5 className="fw-bold mb-1">{auth?.user?.name || "User"}</h5>
          <p className="small mb-0 opacity-75">
            <i className="bi bi-person-check me-1"></i>
            Member Account
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-body p-0">
          <div className="list-group list-group-flush user-menu-list">
            <NavLink
              to="/dashboard/user"
              end
              className={({ isActive }) =>
                `list-group-item list-group-item-action border-0 d-flex align-items-center py-3 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <div
                className="icon-wrapper me-3"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <i className="bi bi-speedometer2"></i>
              </div>
              <span className="fw-500">Dashboard</span>
            </NavLink>

            <NavLink
              to="/dashboard/user/profile"
              className={({ isActive }) =>
                `list-group-item list-group-item-action border-0 d-flex align-items-center py-3 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <div
                className="icon-wrapper me-3"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <i className="bi bi-person-circle"></i>
              </div>
              <span className="fw-500">Profile</span>
            </NavLink>

            <NavLink
              to="/dashboard/user/orders"
              className={({ isActive }) =>
                `list-group-item list-group-item-action border-0 d-flex align-items-center py-3 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <div
                className="icon-wrapper me-3"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <i className="bi bi-bag-check"></i>
              </div>
              <span className="fw-500">My Orders</span>
            </NavLink>

            <NavLink
              to="/dashboard/user/settings"
              className={({ isActive }) =>
                `list-group-item list-group-item-action border-0 d-flex align-items-center py-3 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <div
                className="icon-wrapper me-3"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #fa709a, #fee140)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <i className="bi bi-gear"></i>
              </div>
              <span className="fw-500">Settings</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="btn w-100 mt-3 py-3 rounded-pill fw-bold shadow-sm"
        style={{
          background: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
          color: "white",
          border: "none",
          transition: "all 0.3s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 10px 20px rgba(238, 90, 111, 0.3)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
        }}
      >
        <i className="bi bi-box-arrow-right me-2"></i>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
