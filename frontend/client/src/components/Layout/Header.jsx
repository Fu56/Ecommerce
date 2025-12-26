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
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
      <div className="container">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand brand-text d-flex align-items-center"
        >
          <i className="bi bi-shop-window me-2"></i> All‑Mart
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
              <NavLink to="/" className="nav-link nav-link-custom">
                <i className="bi bi-house-door nav-icon"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category" className="nav-link nav-link-custom">
                <i className="bi bi-grid nav-icon"></i> Category
              </NavLink>
            </li>

            {!auth?.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link nav-link-custom">
                    <i className="bi bi-person-plus nav-icon"></i> Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link nav-link-custom">
                    <i className="bi bi-box-arrow-in-right nav-icon"></i> Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle nav-link-custom text-capitalize"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle nav-icon"></i>{" "}
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <NavLink
                      to={
                        auth?.user?.role === 1
                          ? "/dashboard/admin"
                          : "/dashboard/user"
                      }
                      className="dropdown-item"
                    >
                      <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

            {/* Cart with badge */}
            <li className="nav-item ms-3">
              <NavLink
                to="/cart"
                className="nav-link nav-link-custom position-relative"
              >
                <i className="bi bi-cart3 nav-icon"></i> Cart
                <span className="cart-badge badge rounded-pill bg-danger">
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
