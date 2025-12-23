import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await axios.get("/api/v1/admin/users");
                if (data.success) {
                    setUsers(data.users);
                } else {
                    toast.error("Failed to fetch users");
                }
            } catch (error) {
                toast.error("Error fetching users");
            }
        };
        getUsers();
    }, []);

    return (
        <div className="container-fluid py-4">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <AdminMenu />
                </div>

                {/* Main content */}
                <div className="col-md-9">
                    <h2 className="mb-4 fw-bold text-primary">
                        <i className="bi bi-people-fill me-2"></i> User Management
                    </h2>
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <table className="table table-striped table-hover align-middle">
                                <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>
                                        <i className="bi bi-person-circle me-1"></i> Name
                                    </th>
                                    <th>
                                        <i className="bi bi-envelope me-1"></i> Email
                                    </th>
                                    <th>
                                        <i className="bi bi-shield-lock me-1"></i> Role
                                    </th>
                                    <th>
                                        <i className="bi bi-calendar-check me-1"></i> Joined
                                    </th>
                                    <th>
                                        <i className="bi bi-gear me-1"></i> Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                          <span
                              className={`badge ${
                                  user.role === 1 ? "bg-danger" : "bg-success"
                              }`}
                          >
                            {user.role === 1 ? "Admin" : "User"}
                          </span>
                                            </td>
                                            <td>
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-primary me-2">
                                                    <i className="bi bi-pencil-square"></i>
                                                </button>
                                                <button className="btn btn-sm btn-outline-danger">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted">
                                            No users found
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;
