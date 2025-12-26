import React from "react";
import Layout from "../../components/Layout/Layout";
import { useWishlist } from "../../context/wishlist";
import { useCart } from "../../context/cart";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const [wishlist, setWishlist] = useWishlist();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Remove from wishlist
  const removeFromWishlist = (pid) => {
    try {
      let myWishlist = [...wishlist];
      let index = myWishlist.findIndex((item) => item._id === pid);
      myWishlist.splice(index, 1);
      setWishlist(myWishlist);
      localStorage.setItem("wishlist", JSON.stringify(myWishlist));
      toast.success("Item Removed From Wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  // Clear Wishlist
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist");
    toast.success("Wishlist Cleared");
  };

  // Add to cart
  const handleAddToCart = (p) => {
    setCart([...cart, p]);
    localStorage.setItem("cart", JSON.stringify([...cart, p]));
    toast.success("Added to cart", {
      icon: "🛒",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <Layout title={"Your Wishlist - All-Mart"}>
      <div className="wishlist-container py-5">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-12 text-center">
              <h1 className="fw-bold brand-text display-4 mb-3">
                <i className="bi bi-heart-fill me-3 text-danger"></i>
                My Wishlist
              </h1>
              <p className="lead text-muted">
                {wishlist?.length
                  ? `You have ${wishlist.length} loved items waiting for you`
                  : "Your wishlist is feeling a bit lonely"}
              </p>
              {wishlist?.length > 0 && (
                <button
                  className="btn btn-outline-danger rounded-pill px-4 mt-2"
                  onClick={clearWishlist}
                >
                  Clear Wishlist
                </button>
              )}
            </div>
          </div>

          {wishlist?.length < 1 ? (
            <div className="text-center py-5 empty-state">
              <div className="mb-4">
                <i className="bi bi-heartbreak display-1 text-muted opacity-25"></i>
              </div>
              <h3 className="fw-light text-muted mb-4">
                No items in your wishlist yet
              </h3>
              <Link
                to="/"
                className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm"
              >
                Start Cloud Shopping
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {wishlist?.map((p) => (
                <div className="col-md-6 col-lg-4 col-xl-3" key={p._id}>
                  <div className="card h-100 border-0 shadow-sm product-card hover-lift">
                    <div className="position-relative overflow-hidden product-img-wrapper">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <div className="image-overlay d-flex justify-content-center align-items-center gap-2">
                        <button
                          className="btn btn-light rounded-circle shadow-sm"
                          onClick={() => removeFromWishlist(p._id)}
                          title="Remove from Wishlist"
                        >
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                        <button
                          className="btn btn-light rounded-circle shadow-sm"
                          onClick={() => navigate(`/product/${p.slug}`)}
                          title="View Details"
                        >
                          <i className="bi bi-eye text-primary"></i>
                        </button>
                      </div>
                    </div>

                    <div className="card-body d-flex flex-column p-4">
                      <h5 className="card-title fw-bold text-truncate mb-2">
                        {p.name}
                      </h5>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="h5 fw-bold text-secondary mb-0">
                          ${p.price}
                        </span>
                        <span className="badge bg-light text-dark border rounded-pill px-3">
                          {p?.category?.name}
                        </span>
                      </div>
                      <p className="card-text text-muted small mb-4 flex-grow-1">
                        {p.description.substring(0, 60)}...
                      </p>

                      <button
                        className="btn btn-dark w-100 rounded-pill py-2"
                        onClick={() => handleAddToCart(p)}
                      >
                        <i className="bi bi-bag-plus me-2"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .wishlist-container {
          min-height: 80vh;
          background-color: #f8f9fa;
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
        }
        .product-img-wrapper {
          position: relative;
        }
        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .hover-lift:hover .image-overlay {
          opacity: 1;
        }
      `}</style>
    </Layout>
  );
};

export default Wishlist;
