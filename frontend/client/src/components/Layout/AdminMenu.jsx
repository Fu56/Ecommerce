import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useAuth} from "../../context/auth.jsx";

const AdminMenu = () => {

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({ user: null, token: "" });
        localStorage.removeItem("auth");
        navigate("/login"); // redirect to login page
    };
    return (
        <div className="text-center">
            <div className="list-group shadow-sm">
                <h4 className="list-group-item list-group-item-action active bg-primary border-0">
                    <i className="bi bi-gear-fill me-2"></i> Admin Panel
                </h4>
                <NavLink
                    to="/dashboard/admin/create-category"
                    className="list-group-item list-group-item-action d-flex align-items-center"
                >
                    <i className="bi bi-folder-plus me-2 text-warning"></i> Create Category
                </NavLink>
                <NavLink
                    to="/dashboard/admin/create-product"
                    className="list-group-item list-group-item-action d-flex align-items-center"
                >
                    <i className="bi bi-box-seam me-2 text-success"></i> Create Product
                </NavLink>
                <NavLink
                    to="/dashboard/admin/users"
                    className="list-group-item list-group-item-action d-flex align-items-center"
                >
                    <i className="bi bi-people-fill me-2 text-info"></i> Users
                </NavLink>
                {/* Logout */}
                <NavLink
                    to="/login"
                    onClick={handleLogout}
                    className="list-group-item list-group-item-action d-flex align-items-center text-danger"
                >
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                </NavLink>
            </div>
        </div>
    );
};

export default AdminMenu;
