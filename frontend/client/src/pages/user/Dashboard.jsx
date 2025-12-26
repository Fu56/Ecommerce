import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu.jsx";
import { useWishlist } from "../../context/wishlist";

const Dashboard = () => {
  const [auth] = useAuth();
  const [wishlist] = useWishlist();

  return (
    <Layout title={"Dashboard - All-Mart"}>
      <div className="container-fluid py-5">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Main content */}
          <div className="col-md-9">
            <div className="admin-info-card p-0 border-0 shadow-lg rounded-4 overflow-hidden bg-white">
              {/* Header Gradient */}
              <div
                className="p-5 text-center position-relative"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                }}
              >
                <div
                  className="user-avatar-large mx-auto mb-3 shadow-lg"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3.5rem",
                    fontWeight: "bold",
                    border: "4px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  {auth?.user?.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="fw-bold mb-1">{auth?.user?.name}</h2>
                <span className="badge rounded-pill bg-light text-primary px-3 py-2 fw-600">
                  <i className="bi bi-star-fill me-1"></i> Member Since{" "}
                  {new Date(auth?.user?.createdAt).getFullYear() || "2024"}
                </span>
              </div>

              {/* Info Section */}
              <div className="p-5">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <h4 className="mb-4 text-muted fw-bold text-uppercase small letter-spacing-1">
                      <i className="bi bi-info-circle me-2"></i> Account
                      Overview
                    </h4>

                    <div className="row g-4">
                      {/* Name Card */}
                      <div className="col-md-6">
                        <div className="p-4 rounded-4 bg-light border-start border-4 border-primary shadow-sm h-100">
                          <small
                            className="text-muted d-block text-uppercase fw-bold mb-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Full Name
                          </small>
                          <h5 className="mb-0 fw-bold text-dark">
                            {auth?.user?.name}
                          </h5>
                        </div>
                      </div>

                      {/* Email Card */}
                      <div className="col-md-6">
                        <div className="p-4 rounded-4 bg-light border-start border-4 border-info shadow-sm h-100">
                          <small
                            className="text-muted d-block text-uppercase fw-bold mb-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Email Address
                          </small>
                          <h5 className="mb-0 fw-bold text-dark text-break">
                            {auth?.user?.email}
                          </h5>
                        </div>
                      </div>

                      {/* Phone Card */}
                      <div className="col-md-6">
                        <div className="p-4 rounded-4 bg-light border-start border-4 border-success shadow-sm h-100">
                          <small
                            className="text-muted d-block text-uppercase fw-bold mb-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Contact Number
                          </small>
                          <h5 className="mb-0 fw-bold text-dark">
                            {auth?.user?.phone || "Not Provided"}
                          </h5>
                        </div>
                      </div>

                      {/* Address Card */}
                      <div className="col-md-6">
                        <div className="p-4 rounded-4 bg-light border-start border-4 border-warning shadow-sm h-100">
                          <small
                            className="text-muted d-block text-uppercase fw-bold mb-1"
                            style={{ fontSize: "0.7rem" }}
                          >
                            Primary Address
                          </small>
                          <h5 className="mb-0 fw-bold text-dark small">
                            {auth?.user?.address || "No address on file"}
                          </h5>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats or Actions */}
                    <div className="mt-5 pt-4 border-top">
                      <div className="row text-center g-3">
                        <div className="col-6 col-md-3">
                          <div className="p-3">
                            <h3 className="fw-bold mb-0 text-primary">0</h3>
                            <small className="text-muted">Active Orders</small>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="p-3">
                            <h3 className="fw-bold mb-0 text-success">$0</h3>
                            <small className="text-muted">Total Spent</small>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="p-3">
                            <h3 className="fw-bold mb-0 text-info">
                              {wishlist?.length}
                            </h3>
                            <small className="text-muted">Wishlist Items</small>
                          </div>
                        </div>
                        <div className="col-6 col-md-3">
                          <div className="p-3">
                            <h3 className="fw-bold mb-0 text-warning">0</h3>
                            <small className="text-muted">Reviews</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
        .user-avatar-large {
          transition: all 0.5s ease;
          cursor: default;
        }
        .user-avatar-large:hover {
          transform: scale(1.05) rotate(5deg);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;
