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
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h1 className="fw-bold brand-text display-4">My Wishlist</h1>
            <p className="lead text-muted">
              {wishlist?.length
                ? `You have ${wishlist.length} loved items waiting for you`
                : "Your wishlist is feeling a bit lonely"}
            </p>
          </div>
        </div>

        {wishlist?.length < 1 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="bi bi-heartbreak display-1 text-muted opacity-25"></i>
            </div>
            <h3>No items in your wishlist yet</h3>
            <Link
              to="/"
              className="btn btn-primary btn-lg rounded-pill px-5 mt-4"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlist?.map((p) => (
              <div className="col-md-6 col-lg-4 col-xl-3" key={p._id}>
                <div className="card h-100 border-0 shadow-sm product-card hover-lift">
                  <div className="position-relative overflow-hidden">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 end-0 p-3">
                      <button
                        className="btn btn-light rounded-circle shadow-sm"
                        onClick={() => removeFromWishlist(p._id)}
                        title="Remove from Wishlist"
                      >
                        <i className="bi bi-x-lg text-danger"></i>
                      </button>
                    </div>
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-truncate">
                      {p.name}
                    </h5>
                    <p className="card-text text-muted small mb-3">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="h5 fw-bold text-primary mb-0">
                          ${p.price}
                        </span>
                        <span className="badge bg-light text-dark border">
                          {p?.category?.name}
                        </span>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-dark flex-grow-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-primary flex-grow-1"
                          onClick={() => handleAddToCart(p)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </Layout>
  );
};

export default Wishlist;
