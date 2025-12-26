import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/v1/auth/users");
        if (data.success) {
          setUsers(data.users);
          console.log("Users loaded:", data.users.length);
        } else {
          toast.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <Layout title="User Management - Admin Dashboard">
      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <AdminMenu />
          </div>

          {/* Main content */}
          <div className="col-md-9">
            <div className="admin-info-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h2
                  className="fw-bold brand-text m-0 mb-2 mb-md-0"
                  style={{ fontSize: "2rem" }}
                >
                  <i className="bi bi-people-fill me-2"></i> User Management
                </h2>
                <span className="badge bg-primary fs-6 px-3 py-2">
                  {users.length} Total Users
                </span>
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
                  <p className="mt-3 text-muted">Loading users...</p>
                </div>
              ) : (
                <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle m-0">
                      <thead
                        style={{
                          background:
                            "linear-gradient(135deg, #1a2a6c, #b21f1f)",
                          color: "white",
                        }}
                      >
                        <tr>
                          <th className="py-3">#</th>
                          <th className="py-3">
                            <i className="bi bi-person-circle me-1"></i> Name
                          </th>
                          <th className="py-3 d-none d-md-table-cell">
                            <i className="bi bi-envelope me-1"></i> Email
                          </th>
                          <th className="py-3 d-none d-lg-table-cell">
                            <i className="bi bi-telephone me-1"></i> Phone
                          </th>
                          <th className="py-3 d-none d-xl-table-cell">
                            <i className="bi bi-geo-alt me-1"></i> Address
                          </th>
                          <th className="py-3">
                            <i className="bi bi-shield-lock me-1"></i> Role
                          </th>
                          <th className="py-3 d-none d-sm-table-cell">
                            <i className="bi bi-calendar-check me-1"></i> Joined
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 ? (
                          users.map((user, index) => (
                            <tr
                              key={user._id}
                              style={{ transition: "all 0.3s" }}
                            >
                              <td className="fw-bold">{index + 1}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div
                                    className="avatar-circle me-2"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%",
                                      background:
                                        "linear-gradient(135deg, #667eea, #764ba2)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "white",
                                      fontWeight: "bold",
                                      fontSize: "1.1rem",
                                    }}
                                  >
                                    {user.name.charAt(0).toUpperCase()}
                                  </div>
                                  <span className="fw-500">{user.name}</span>
                                </div>
                              </td>
                              <td className="text-muted d-none d-md-table-cell">
                                {user.email}
                              </td>
                              <td className="text-muted d-none d-lg-table-cell">
                                {user.phone || "N/A"}
                              </td>
                              <td className="text-muted small d-none d-xl-table-cell">
                                {user.address
                                  ? user.address.length > 30
                                    ? user.address.substring(0, 30) + "..."
                                    : user.address
                                  : "N/A"}
                              </td>
                              <td>
                                <span
                                  className={`badge rounded-pill ${
                                    user.role === 1 ? "bg-danger" : "bg-success"
                                  }`}
                                >
                                  {user.role === 1 ? "Admin" : "User"}
                                </span>
                              </td>
                              <td className="text-muted small d-none d-sm-table-cell">
                                {new Date(user.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="text-center text-muted py-5"
                            >
                              <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                              No users found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
