import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/cart.jsx";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setLoading(false);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Add to cart functionality (copied from HomePage)
  const handleAddToCart = (p) => {
    setCart([...cart, p]);
    localStorage.setItem("cart", JSON.stringify([...cart, p]));
    toast.success("Item Added to Cart", {
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  return (
    <Layout title={`${category?.name || "Category"} - All-Mart`}>
      <div className="container mt-3">
        <h4
          className="text-center brand-text mb-4"
          style={{ fontSize: "2.5rem" }}
        >
          Category - {category?.name}
        </h4>
        <h6 className="text-center text-muted mb-5">
          {products?.length} result found
        </h6>

        {loading ? (
          <div className="text-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
            {products?.map((p) => (
              <div className="col" key={p._id}>
                <div
                  className="product-card"
                  onClick={() => navigate(`/product/${p.slug}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="product-img-wrapper">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div className="card-actions">
                      <button
                        className="btn-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${p.slug}`);
                        }}
                        title="View Details"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className="btn-action"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(p);
                        }}
                        title="Add to Cart"
                      >
                        <i className="bi bi-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-light text-dark border rounded-pill">
                        {category?.name || "Product"}
                      </span>
                      <div className="price-tag">${p.price}</div>
                    </div>
                    <h5 className="product-title">{p.name}</h5>
                    <p className="product-desc">
                      {p.description.substring(0, 60)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
