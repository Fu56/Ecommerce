import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.js";
import { useCart } from "../context/cart.jsx";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1 && !checked.length && !radio.length) {
      getAllProducts(); // Initial load for page 1 if no filters
    } else if (page > 1 && !checked.length && !radio.length) {
      loadMore(); // Load more for subsequent pages if no filters
    }
  }, [page]); // Depend on page to trigger loadMore or initial getAllProducts

  // Load more products (for non-filtered state)
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    setPage(1); // Reset page to 1 when filters change
  };

  // Handle price radio filter
  const handlePriceFilter = (e) => {
    setRadio(e.target.value);
    setPage(1); // Reset page to 1 when filters change
  };

  // Initial load of products (without filters)
  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
  }, [checked.length, radio.length]); // Re-run when filters are cleared

  // Get filtered products
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]); // Re-run when filters are applied

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Add to cart functionality
  const handleAddToCart = (p) => {
    setCart([...cart, p]);
    localStorage.setItem("cart", JSON.stringify([...cart, p]));
    toast.success("Item Added to Cart", {
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  // Search Filtering
  const getDisplayProducts = () => {
    if (!searchTerm) return products;
    return products?.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const finalProducts = getDisplayProducts();

  return (
    <Layout title={"Best offers "}>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div
            className="row align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="col-lg-7 hero-content">
              <h1>
                Discover Your <br /> Next Favorite Item
              </h1>
              <p>
                Curated collection of premium products at unbeatable prices.
                Shop the latest trends now.
              </p>

              {/* Search Input */}
              <div className="search-container">
                <i className="bi bi-search text-white ms-3 align-self-center"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <div className="filter-card">
              <div className="filter-header">
                <i className="bi bi-grid-3x3-gap-fill me-3"></i>
                <span>Categories</span>
              </div>
              <div className="filter-body d-flex flex-column">
                {categories?.map((c) => (
                  <div key={c._id} className="filter-item-wrapper">
                    <Checkbox
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      className="w-100 m-0 fw-500"
                    >
                      {c.name}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>

            <div className="filter-card mt-4">
              <div className="filter-header">
                <i className="bi bi-currency-dollar me-3"></i>
                <span>Price Range</span>
              </div>
              <div className="filter-body">
                <Radio.Group onChange={handlePriceFilter} className="w-100">
                  <div className="d-flex flex-column">
                    {Prices?.map((p) => (
                      <div key={p._id} className="filter-item-wrapper">
                        <Radio value={p.array} className="w-100 m-0 fw-500">
                          {p.name}
                        </Radio>
                      </div>
                    ))}
                  </div>
                </Radio.Group>
              </div>
            </div>

            <button
              className="btn filter-reset-btn w-100 rounded-pill py-3 mt-2"
              onClick={() => window.location.reload()}
            >
              <i className="bi bi-arrow-counterclockwise me-2"></i>
              Reset All Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="col-12 col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4
                className="fw-bold m-0 brand-text"
                style={{ fontSize: "2rem" }}
              >
                {searchTerm ? `Results for "${searchTerm}"` : "All Products"}
              </h4>
              <span className="text-muted">
                {finalProducts?.length} Products Found
              </span>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {finalProducts?.map((p) => (
                <div className="col" key={p._id}>
                  <div
                    className="product-card"
                    onClick={() => navigate(`/product/${p.slug}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="product-img-wrapper">
                      <img
                        src={`${
                          import.meta.env.VITE_API || ""
                        }/api/v1/product/product-photo/${p._id}`}
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
                          {p.category?.name || "Product"}
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

            <div className="m-2 p-3 text-center">
              {products && products.length < total && !searchTerm && (
                <button
                  className="btn btn-outline-dark rounded-pill px-5 py-2 fw-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    <span>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Loading...
                    </span>
                  ) : (
                    "Load More"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
