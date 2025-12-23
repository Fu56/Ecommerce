import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';

const Header = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container">
                    {/* Brand */}
                    <Link to="/" className="navbar-brand fw-bold text-primary">
                        🛒 All-Mart
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
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link hover-link">
                                    Category
                                </NavLink>
                            </li>

                            {!auth?.user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link hover-link">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link hover-link">
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item dropdown">
                                    <NavLink
                                        className="nav-link dropdown-toggle hover-link"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {auth?.user?.name}
                                    </NavLink>
                                    <ul className="dropdown-menu dropdown-menu-end shadow rounded">
                                        <li>
                                            <NavLink to="/dashboard" className="dropdown-item hover-dropdown">
                                                Dashboard
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                onClick={handleLogout}
                                                to="/login"
                                                className="dropdown-item text-danger hover-dropdown"
                                            >
                                                Logout
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            )}

                            {/* Cart with badge */}
                            <li className="nav-item ms-3">
                                <NavLink to="/cart" className="nav-link position-relative hover-link">
                                    Cart 🛒
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate-badge">
                    3
                  </span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
