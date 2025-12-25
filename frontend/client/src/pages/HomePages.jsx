import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout/Layout.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox, Radio } from 'antd';
import { Prices } from "../components/Prices.js";

const HomePage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

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
        getTotal()
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
        if (page === 1 && (!checked.length && !radio.length)) {
            getAllProducts(); // Initial load for page 1 if no filters
        } else if (page > 1 && (!checked.length && !radio.length)) {
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
        let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        cart.push(p);
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Item Added to Cart");
    };

    return (
        <Layout title={"Best offers"}>
            {/* Hero Banner */}
            <div className="container-fluid p-0 mb-4">
                <div className="bg-dark text-white text-center py-5" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1472851294608-415512118943?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <h1 className="display-3 fw-bold">Welcome to All-Mart</h1>
                    <p className="lead">Discover the best products at unbeatable prices</p>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                    {/* Filters Sidebar */}
                    <div className="col-md-3 mb-4">
                        <div className="card shadow-sm border-0 mb-3">
                            <div className="card-header bg-white fw-bold">Filter by Category</div>
                            <div className="card-body">
                                <div className="d-flex flex-column">
                                    {categories?.map((c) => (
                                        <Checkbox
                                            key={c._id}
                                            onChange={(e) => handleFilter(e.target.checked, c._id)}
                                        >
                                            {c.name}
                                        </Checkbox>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="card shadow-sm border-0 mb-3">
                            <div className="card-header bg-white fw-bold">Filter by Price</div>
                            <div className="card-body">
                                <Radio.Group onChange={handlePriceFilter}>
                                    <div className="d-flex flex-column">
                                        {Prices?.map((p) => (
                                            <Radio key={p._id} value={p.array}>
                                                {p.name}
                                            </Radio>
                                        ))}
                                    </div>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-danger" onClick={() => window.location.reload()}>
                                RESET FILTERS
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="col-md-9">
                        <h4 className="fw-bold mb-4">All Products</h4>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {products?.map((p) => (
                                <div className="col" key={p._id}>
                                    <div className="card h-100 shadow-sm border-0">
                                        <img
                                            src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                            style={{ height: "250px", objectFit: "cover" }}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className="card-title fw-bold text-dark mb-0 text-truncate" style={{ maxWidth: "70%" }}>{p.name}</h5>
                                                <span className="badge bg-success">${p.price}</span>
                                            </div>
                                            <p className="card-text text-muted small flex-grow-1">
                                                {p.description.substring(0, 60)}...
                                            </p>
                                            <div className="d-grid gap-2 mt-3">
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                                <button 
                                                    className="btn btn-dark btn-sm" 
                                                    onClick={() => handleAddToCart(p)}
                                                >
                                                    <i className="bi bi-cart-plus me-2"></i> Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="m-2 p-3">
                            {products && products.length < total && (
                                <button
                                    className="btn btn-warning"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}
                                >
                                    {loading ? "Loading ..." : "Loadmore"}
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
