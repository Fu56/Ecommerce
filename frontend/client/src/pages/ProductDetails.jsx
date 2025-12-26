import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/cart.jsx";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
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

  // Add to cart functionality (reusing logic)
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
    <Layout>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex justify-content-center">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="img-fluid rounded"
                alt={product.name}
                style={{ maxHeight: "500px", objectFit: "contain" }}
              />
            </div>
          </div>
          <div className="col-md-6 pt-5">
            <h1 className="fw-bold brand-text">{product.name}</h1>
            <p className="fs-5 text-muted">{product.description}</p>
            <h4 className="fw-bold text-success mb-3">
              Price : ${product.price}
            </h4>
            <h6 className="mb-3">Category : {product?.category?.name}</h6>
            <button
              className="btn btn-dark w-50 py-2 rounded-pill fw-bold"
              onClick={() => handleAddToCart(product)}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <hr />
        <div className="row container">
          <h4 className="brand-text mb-4">Similar Products</h4>
          {relatedProducts.length < 1 && (
            <p className="text-center text-muted">No Similar Products found</p>
          )}
          <div className="d-flex flex-wrap gap-4">
            {relatedProducts?.map((p) => (
              <div
                className="card m-2 border-0 shadow-sm"
                style={{
                  width: "18rem",
                  borderRadius: "15px",
                  overflow: "hidden",
                }}
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{p.name}</h5>
                  <p className="card-text text-muted">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold fs-5">${p.price}</span>
                    <button
                      className="btn btn-outline-dark btn-sm rounded-pill px-3"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
