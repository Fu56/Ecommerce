import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useAuth} from "../../context/auth.jsx";

const UserMenu = () => {
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
                {/* Header */}
                <h4 className="list-group-item list-group-item-action active bg-primary border-0">
                    <i className="bi bi-speedometer2 me-2"></i> User Dashboard
                </h4>

                {/* Profile */}
                <NavLink
                    to="/dashboard/user/profile"
                    className={({ isActive }) =>
                        `list-group-item list-group-item-action d-flex align-items-center ${
                            isActive ? "active fw-bold" : ""
                        }`
                    }
                >
                    <i className="bi bi-person-circle me-2 text-info"></i> Profile
                </NavLink>

                {/* Orders */}
                <NavLink
                    to="/dashboard/user/orders"
                    className={({ isActive }) =>
                        `list-group-item list-group-item-action d-flex align-items-center ${
                            isActive ? "active fw-bold" : ""
                        }`
                    }
                >
                    <i className="bi bi-bag-check me-2 text-success"></i> Orders
                </NavLink>

                {/* Settings */}
                <NavLink
                    to="/dashboard/user/settings"
                    className={({ isActive }) =>
                        `list-group-item list-group-item-action d-flex align-items-center ${
                            isActive ? "active fw-bold" : ""
                        }`
                    }
                >
                    <i className="bi bi-gear me-2 text-warning"></i> Settings
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

export default UserMenu;
