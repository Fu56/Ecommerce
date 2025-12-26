import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Admin Dashboard - All-Mart"}>
      <div className="container-fluid py-5">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* Main content */}
          <div className="col-md-9">
            <div className="admin-info-card">
              <div className="row g-0 h-100">
                {/* Left Side: Avatar & Name */}
                <div className="col-md-4 border-end">
                  <div className="admin-avatar-section h-100">
                    <div className="admin-avatar-icon">
                      <i className="bi bi-shield-lock-fill"></i>
                    </div>
                    <h2
                      className="mb-2 fw-bold text-center brand-text"
                      style={{ fontSize: "1.8rem" }}
                    >
                      {auth?.user?.name}
                    </h2>
                    <span className="badge rounded-pill bg-dark px-4 py-2 mt-2">
                      <i className="bi bi-stars me-1"></i> Administrator
                    </span>
                  </div>
                </div>

                {/* Right Side: Details */}
                <div className="col-md-8">
                  <div className="admin-details-section">
                    <h4 className="mb-4 text-muted fw-bold text-uppercase small">
                      Account Details
                    </h4>

                    <div className="detail-item">
                      <div className="detail-icon text-primary">
                        <i className="bi bi-envelope-fill"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block">
                          Configured Email Address
                        </small>
                        <span className="fw-medium">{auth?.user?.email}</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-icon text-success">
                        <i className="bi bi-telephone-fill"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block">
                          Contact Number
                        </small>
                        <span className="fw-medium">{auth?.user?.phone}</span>
                      </div>
                    </div>

                    <div className="detail-item">
                      <div className="detail-icon text-warning">
                        <i className="bi bi-geo-alt-fill"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block">
                          Primary Address
                        </small>
                        <span className="fw-medium">
                          {auth?.user?.address || "No address provided"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
