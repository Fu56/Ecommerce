import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useCategory } from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { useWishlist } from "../../context/wishlist";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [wishlist] = useWishlist();
  const navigate = useNavigate();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
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
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle nav-link-custom"
                to={"/categories"}
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-grid nav-icon"></i> Categories
              </Link>
              <ul
                className="dropdown-menu shadow-lg border-0 rounded-4 mt-2"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <li>
                  <Link
                    className="dropdown-item px-3 py-2 fw-bold"
                    to={"/categories"}
                  >
                    All Categories
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {categories?.map((c) => (
                  <li key={c._id}>
                    <Link
                      className="dropdown-item px-3 py-2"
                      to={`/category/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
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
                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-4 mt-2">
                  <div className="px-3 py-2 border-bottom">
                    <b className="d-block">{auth?.user?.name}</b>
                    <small className="text-muted">{auth?.user?.email}</small>
                  </div>
                  <li>
                    <NavLink
                      to={
                        auth?.user?.role === 1
                          ? "/dashboard/admin"
                          : "/dashboard/user"
                      }
                      className="dropdown-item px-3 py-2"
                    >
                      <i className="bi bi-speedometer2 me-2 text-primary"></i>{" "}
                      Dashboard
                    </NavLink>
                  </li>
                  {auth?.user?.role !== 1 && (
                    <>
                      <li>
                        <NavLink
                          to="/dashboard/user/profile"
                          className="dropdown-item px-3 py-2"
                        >
                          <i className="bi bi-person me-2 text-info"></i>{" "}
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/dashboard/user/orders"
                          className="dropdown-item px-3 py-2"
                        >
                          <i className="bi bi-box-seam me-2 text-success"></i>{" "}
                          Orders
                        </NavLink>
                      </li>
                    </>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item px-3 py-2 text-danger fw-bold"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
            {/* Wishlist with badge */}
            <li className="nav-item ms-2">
              <Badge
                count={wishlist?.length}
                showZero
                offset={[5, 10]}
                color="#fdbb2d"
              >
                <NavLink
                  to="/wishlist"
                  className="nav-link nav-link-custom position-relative"
                >
                  <i className="bi bi-heart nav-icon"></i> Wishlist
                </NavLink>
              </Badge>
            </li>
            {/* Cart with badge */}
            <li className="nav-item ms-3">
              <Badge count={cart?.length} showZero offset={[5, 10]}>
                <NavLink
                  to="/cart"
                  className="nav-link nav-link-custom position-relative"
                >
                  <i className="bi bi-cart3 nav-icon"></i> Cart
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
