import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";

const Header = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
        navigate("/login"); // redirect after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container">
                {/* Brand */}
                <Link to="/" className="navbar-brand fw-bold text-primary d-flex align-items-center">
                    <i className="bi bi-cart-check-fill me-2"></i> All‑Mart
                </Link>

                {/* Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav Links */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link hover-link">
                                <i className="bi bi-house-door me-1"></i> Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/category" className="nav-link hover-link">
                                <i className="bi bi-grid me-1"></i> Category
                            </NavLink>
                        </li>

                        {!auth?.user ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/register" className="nav-link hover-link">
                                        <i className="bi bi-person-plus me-1"></i> Register
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/login" className="nav-link hover-link">
                                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item dropdown">
                                <NavLink
                                    className="nav-link dropdown-toggle hover-link fw-bold text-capitalize"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-person-circle me-1"></i> {auth?.user?.name}
                                </NavLink>
                                <ul className="dropdown-menu dropdown-menu-end shadow rounded">
                                    <li>
                                        <NavLink
                                            to={auth?.user?.role === 1 ? "/dashboard/admin" : "/dashboard/user"}
                                            className="dropdown-item"
                                        >
                                            <i className="bi bi-speedometer2 me-2"></i> Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="dropdown-item text-danger hover-dropdown"
                                        >
                                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}

                        {/* Cart with badge */}
                        <li className="nav-item ms-3">
                            <NavLink to="/cart" className="nav-link position-relative hover-link">
                                <i className="bi bi-cart3 me-1"></i> Cart
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate-badge">
                  3
                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
