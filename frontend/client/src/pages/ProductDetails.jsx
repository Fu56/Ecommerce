import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cart.jsx";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
    scrollToTop();
  }, [params?.slug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get product
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add to cart functionality
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

  if (loading) {
    return (
      <Layout>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${product.name || "Product Details"} - All-Mart`}>
      <div className="product-details-container py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            {/* Product Image Section */}
            <div className="col-lg-6">
              <div className="product-image-wrapper p-5">
                <div className="image-backdrop"></div>
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  className="img-fluid product-main-img"
                  alt={product.name}
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="col-lg-6">
              <div className="product-info-wrapper animate-up">
                <div className="d-flex align-items-center mb-3">
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill text-uppercase tracking-wide">
                    {product?.category?.name || "Category"}
                  </span>
                  {/* Stock Status could go here */}
                  <span className="ms-3 text-success fw-bold small">
                    <i className="bi bi-check-circle-fill me-1"></i> In Stock
                  </span>
                </div>

                <h1 className="display-4 fw-bold product-title mb-3">
                  {product.name}
                </h1>

                <div className="d-flex align-items-center mb-4">
                  <div className="product-price h2 mb-0 me-4">
                    ${product.price}
                  </div>
                  <div className="product-rating text-warning small">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                    <span className="text-muted ms-2">(4.8)</span>
                  </div>
                </div>

                <div className="product-description mb-5">
                  <p className="lead text-muted">{product.description}</p>
                </div>

                <div className="d-flex gap-3 mb-5">
                  <button
                    className="btn btn-primary btn-lg rounded-pill px-5 py-3 flex-grow-1 add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="bi bi-bag-plus-fill me-2"></i> Add to Cart
                  </button>
                  <button className="btn btn-outline-secondary btn-lg rounded-circle icon-btn border-2">
                    <i className="bi bi-heart"></i>
                  </button>
                  <button className="btn btn-outline-secondary btn-lg rounded-circle icon-btn border-2">
                    <i className="bi bi-share"></i>
                  </button>
                </div>

                <div className="product-features row g-3">
                  <div className="col-6">
                    <div className="feature-item d-flex align-items-center text-muted">
                      <i className="bi bi-truck me-3 fs-4 text-primary"></i>
                      <span>Free Delivery</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="feature-item d-flex align-items-center text-muted">
                      <i className="bi bi-shield-check me-3 fs-4 text-primary"></i>
                      <span>2 Year Warranty</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-5">
            <h3 className="section-title mb-4">
              Similar Products{" "}
              <span className="text-primary">You May Like</span>
            </h3>
            <div className="divider mb-5"></div>

            {relatedProducts.length < 1 ? (
              <div className="text-center py-5">
                <i className="bi bi-basket display-1 text-muted mb-3 d-block"></i>
                <p className="text-muted fs-5">No similar products found.</p>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {relatedProducts?.map((p) => (
                  <div className="col" key={p._id}>
                    <div
                      className="card h-100 product-card-sm border-0 shadow-sm"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      <div className="img-wrapper-sm position-relative overflow-hidden">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                        />
                        <div className="overlay d-flex justify-content-center align-items-center gap-2">
                          <button className="btn btn-light rounded-circle shadow-sm btn-sm-action">
                            <i className="bi bi-eye-fill"></i>
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <h6 className="card-title text-truncate fw-bold">
                          {p.name}
                        </h6>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <span className="fw-bold text-primary">
                            ${p.price}
                          </span>
                          <button
                            className="btn btn-sm btn-outline-primary rounded-pill px-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/product/${p.slug}`);
                            }}
                          >
                            Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-details-container {
          background-color: #fdfdfd;
        }

        .product-image-wrapper {
          position: relative;
          background: #fff;
          border-radius: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 500px;
          transition: transform 0.3s ease;
        }

        .product-image-wrapper:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.08);
        }

        .product-main-img {
          max-height: 400px;
          object-fit: contain;
          z-index: 2;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .product-image-wrapper:hover .product-main-img {
          transform: scale(1.05);
        }

        .product-title {
          font-family: "Playfair Display", serif;
          color: #1a2a6c;
          letter-spacing: -0.5px;
        }

        .product-price {
          color: #b21f1f;
          font-weight: 800;
          font-family: "Poppins", sans-serif;
        }

        .add-to-cart-btn {
          background: linear-gradient(135deg, #1a2a6c 0%, #2a5298 100%);
          border: none;
          box-shadow: 0 10px 20px rgba(26, 42, 108, 0.2);
          transition: all 0.3s ease;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .add-to-cart-btn:hover {
          background: linear-gradient(135deg, #2a5298 0%, #1a2a6c 100%);
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(26, 42, 108, 0.3);
        }

        .icon-btn {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .icon-btn:hover {
          background-color: #f8f9fa;
          color: #b21f1f;
          border-color: #b21f1f;
          transform: translateY(-2px);
        }

        .animate-up {
          animation: fadeUp 0.8s ease-out forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
        }

        .divider {
          width: 60px;
          height: 4px;
          background: linear-gradient(to right, #1a2a6c, #b21f1f);
          border-radius: 2px;
        }

        /* Small Product Card for Similar Products */
        .product-card-sm {
          transition: all 0.3s ease;
          overflow: hidden;
          border-radius: 15px;
          cursor: pointer;
        }

        .product-card-sm:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }

        .img-wrapper-sm {
          height: 220px;
          background: #f8f9fa;
        }

        .img-wrapper-sm img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card-sm:hover .img-wrapper-sm img {
          transform: scale(1.1);
        }

        .tracking-wide {
          letter-spacing: 1px;
        }

        @media (max-width: 991px) {
          .product-image-wrapper {
            min-height: 400px;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </Layout>
  );
};

export default ProductDetails;
