import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart.jsx";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal } from "antd";
import axios from "axios";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderId, setOrderId] = useState("");
  const receiptRef = useRef();

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

  //handle checkout with Chapa
  const handleCheckout = async () => {
    try {
      // Calculate total amount
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });

      // Convert USD to ETB (approximate rate: 1 USD = 120 ETB)
      const amountInETB = total * 120;

      // Split user name
      const nameParts = auth?.user?.name?.split(" ") || ["", ""];
      const firstName = nameParts[0] || "Customer";
      const lastName = nameParts.slice(1).join(" ") || "User";

      // Initialize payment with Chapa
      const { data } = await axios.post("/api/v1/payment/initialize", {
        amount: amountInETB,
        email: auth?.user?.email,
        firstName: firstName,
        lastName: lastName,
        cart: cart.map((item) => item._id),
      });

      if (data?.success) {
        // Redirect to Chapa payment page
        window.location.href = data.data.checkout_url;
      } else {
        toast.error("Failed to initialize payment");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with checkout");
    }
  };

  // Print Receipt
  const handlePrint = () => {
    const printContent = receiptRef.current;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore React bindings
  };

  // Download as Text
  const handleDownloadTxt = () => {
    const receiptText = `
========================================
           ALL-MART RECEIPT
========================================
Order ID:   ${orderId}
Date:       ${new Date().toLocaleString()}
Status:     PAID
========================================

CUSTOMER DETAILS:
Name:       ${auth?.user?.name}
Email:      ${auth?.user?.email}
Address:    ${auth?.user?.address}

========================================
ITEMS PURCHASED:
${cart
  .map((p, i) => `${i + 1}. ${p.name.padEnd(25)} $${p.price}.00`)
  .join("\n")}

========================================
SUBTOTAL:   ${totalPrice()}
TAX (0%):   $0.00
TOTAL:      ${totalPrice()}
========================================

Thank you for shopping at All-Mart!
Visit us again at: www.all-mart.com
========================================
    `;
    const element = document.createElement("a");
    const file = new Blob([receiptText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `receipt-${orderId}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const handleFinish = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setShowReceipt(false);
    navigate("/");
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
                onClick={handleCheckout}
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

      {/* Receipt Modal */}
      <Modal
        title="Order Receipt"
        open={showReceipt}
        onCancel={() => setShowReceipt(false)}
        footer={[
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePrint}
          >
            <i className="bi bi-printer me-1"></i> Print / PDF
          </button>,
          <button
            className="btn btn-outline-secondary me-2"
            onClick={handleDownloadTxt}
          >
            <i className="bi bi-download me-1"></i> Download TXT
          </button>,
          <button className="btn btn-dark" onClick={handleFinish}>
            Finish
          </button>,
        ]}
        width={600}
      >
        <div
          ref={receiptRef}
          className="receipt-container p-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <div className="text-center mb-5">
            <h1
              className="brand-text fw-bold mb-0"
              style={{ letterSpacing: "2px" }}
            >
              ALL-MART
            </h1>
            <p className="text-secondary small mb-3">E-COMMERCE SOLUTIONS</p>
            <div
              style={{
                height: "2px",
                background:
                  "linear-gradient(to right, transparent, #c1121f, transparent)",
                margin: "10px 0",
              }}
            ></div>
            <h4
              className="fw-bold text-uppercase mt-2"
              style={{ letterSpacing: "4px" }}
            >
              Sales Receipt
            </h4>
          </div>

          <div className="row mb-4">
            <div className="col-7">
              <h6 className="text-muted small text-uppercase fw-bold mb-1">
                Company Details:
              </h6>
              <p className="small mb-0 fw-bold">All-Mart Global Inc.</p>
              <p className="small mb-0">123 Business Plaza, Tech City</p>
              <p className="small mb-0">T: +1 (555) 000-1234</p>
              <p className="small">E: support@all-mart.com</p>
            </div>
            <div className="col-5 text-end">
              <div className="bg-light p-2 rounded">
                <p className="mb-0 small text-muted text-uppercase fw-bold">
                  Invoiced To:
                </p>
                <p className="fw-bold mb-0">{auth?.user?.name}</p>
                <p className="small mb-0">{auth?.user?.address}</p>
              </div>
            </div>
          </div>

          <div className="row mb-5 pb-3 border-bottom">
            <div className="col-6">
              <p className="mb-0 small text-muted text-uppercase fw-bold">
                Order Number:
              </p>
              <p className="fw-bold text-primary">{orderId}</p>
            </div>
            <div className="col-6 text-end">
              <p className="mb-0 small text-muted text-uppercase fw-bold">
                Transaction Date:
              </p>
              <p className="fw-bold">{new Date().toLocaleString()}</p>
            </div>
          </div>

          <div className="order-items mb-4">
            <table className="table table-borderless">
              <thead className="border-bottom">
                <tr>
                  <th className="small text-muted text-uppercase">
                    Description
                  </th>
                  <th className="small text-muted text-uppercase text-end">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((p) => (
                  <tr key={p._id}>
                    <td className="py-3">
                      <div className="fw-bold">{p.name}</div>
                      <div className="small text-muted">
                        {p.description.substring(0, 40)}...
                      </div>
                    </td>
                    <td className="py-3 text-end fw-bold align-middle">
                      ${p.price}.00
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row justify-content-end mt-4 d-print-none">
            <div className="col-12 text-center mb-3">
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-primary rounded-pill px-4 shadow-sm"
                  onClick={handlePrint}
                >
                  <i className="bi bi-file-earmark-pdf me-2"></i> Download PDF
                </button>
                <button
                  className="btn btn-outline-dark rounded-pill px-4 shadow-sm"
                  onClick={handleDownloadTxt}
                >
                  <i className="bi bi-file-earmark-text me-2"></i> Download TXT
                </button>
              </div>
            </div>
          </div>

          <div className="row justify-content-end mt-4">
            <div className="col-6">
              <div className="card border-0 bg-light p-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal:</span>
                  <span className="fw-bold">{totalPrice()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Tax (0%):</span>
                  <span className="fw-bold">$0.00</span>
                </div>
                <div className="border-top pt-2 d-flex justify-content-between">
                  <h5 className="fw-bold mb-0">Total Paid:</h5>
                  <h5 className="fw-bold text-danger mb-0">{totalPrice()}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5 pt-5">
            <p className="small text-muted mb-1">
              Payment Status: <span className="badge bg-success">PAID</span>
            </p>
            <p className="small text-muted mb-0">
              *** This is a computer-generated receipt ***
            </p>
            <p className="fw-bold small brand-text mt-3">
              Thanks for choosing All-Mart!
            </p>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default CartPage;
