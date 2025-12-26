import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart.jsx";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item Removed from Cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Your Cart - All-Mart"}>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-12">
            <h1
              className="text-center brand-text mb-4"
              style={{ fontSize: "2.5rem" }}
            >
              {`Hey ${
                auth?.token && auth?.user?.name ? auth.user.name : "Guest"
              }`}
            </h1>
            <h4 className="text-center text-muted mb-5">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : " (Please login to checkout)"
                  }`
                : "Your cart is currently empty"}
            </h4>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-8">
            <div className="cart-items-container">
              {cart?.map((p) => (
                <div
                  className="card mb-3 border-0 shadow-sm overflow-hidden"
                  key={`${p._id}-${Math.random()}`}
                >
                  <div className="row g-0 align-items-center">
                    <div className="col-md-3">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="img-fluid rounded-start h-100"
                        alt={p.name}
                        style={{ objectFit: "cover", minHeight: "150px" }}
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="card-title fw-bold mb-1">{p.name}</h5>
                          <p className="card-text text-muted small mb-2">
                            {p.description.substring(0, 60)}...
                          </p>
                          <h5 className="text-success fw-bold">${p.price}</h5>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm rounded-pill px-3"
                          onClick={() => removeCartItem(p._id)}
                        >
                          <i className="bi bi-trash3 me-1"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-4">
            <div className="cart-summary-card p-4 bg-white shadow-sm rounded-4 border-0">
              <h2 className="fw-bold mb-4">Summary</h2>
              <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold">{totalPrice()}</span>
              </div>
              <div className="d-flex justify-content-between mb-4 border-bottom pb-3">
                <span className="text-muted">Total</span>
                <span className="fw-bold fs-4 text-primary">
                  {totalPrice()}
                </span>
              </div>

              {auth?.user?.address ? (
                <div className="mb-4">
                  <h6 className="fw-bold text-uppercase small text-muted mb-2">
                    Delivery Address
                  </h6>
                  <p className="mb-3">{auth?.user?.address}</p>
                  <button
                    className="btn btn-outline-dark btn-sm rounded-pill w-100"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-4">
                  {auth?.token ? (
                    <button
                      className="btn btn-warning rounded-pill w-100 fw-bold"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Add Address to Checkout
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary rounded-pill w-100 fw-bold shadow"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Login to Checkout
                    </button>
                  )}
                </div>
              )}

              <button
                className="btn btn-dark btn-lg w-100 rounded-pill fw-bold mt-2"
                disabled={
                  !auth?.token || !auth?.user?.address || cart.length === 0
                }
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
