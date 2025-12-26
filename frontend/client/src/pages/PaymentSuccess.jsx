import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const tx_ref = searchParams.get("trx_ref") || searchParams.get("tx_ref");

  useEffect(() => {
    if (tx_ref) {
      verifyPayment();
    } else {
      setLoading(false);
      setPaymentStatus("error");
    }
  }, [tx_ref]);

  const verifyPayment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/payment/verify/${tx_ref}`);

      if (response.data.success) {
        setPaymentStatus("success");
        setOrderDetails(response.data.data);

        // Clear cart after successful payment
        setTimeout(() => {
          setCart([]);
          localStorage.removeItem("cart");
        }, 2000);

        toast.success("Payment verified successfully!");
      } else {
        setPaymentStatus("failed");
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setPaymentStatus("error");
      toast.error("Error verifying payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Payment Status - All-Mart">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              {loading ? (
                <div className="card-body text-center py-5">
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h4 className="fw-bold mb-2">Verifying Payment...</h4>
                  <p className="text-muted">
                    Please wait while we confirm your transaction
                  </p>
                </div>
              ) : (
                <>
                  {paymentStatus === "success" && (
                    <div className="card-body text-center py-5">
                      <div
                        className="success-checkmark mb-4"
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "0 auto",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          animation: "scaleIn 0.5s ease-out",
                        }}
                      >
                        <i
                          className="bi bi-check-lg text-white"
                          style={{ fontSize: "3rem" }}
                        ></i>
                      </div>

                      <h2 className="fw-bold mb-3" style={{ color: "#667eea" }}>
                        Payment Successful!
                      </h2>

                      <p className="text-muted mb-4">
                        Thank you for your purchase. Your order has been
                        confirmed.
                      </p>

                      {orderDetails && (
                        <div className="bg-light rounded-3 p-4 mb-4 text-start">
                          <h6 className="text-uppercase small text-muted fw-bold mb-3">
                            Transaction Details
                          </h6>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Transaction Ref:</span>
                            <span className="fw-bold">
                              {orderDetails.tx_ref || tx_ref}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Amount Paid:</span>
                            <span className="fw-bold text-success">
                              ETB {orderDetails.amount || orderDetails.charge}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Payment Method:</span>
                            <span className="fw-bold">
                              {orderDetails.method || "Chapa"}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Status:</span>
                            <span className="badge bg-success">Completed</span>
                          </div>
                        </div>
                      )}

                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary btn-lg rounded-pill fw-bold"
                          onClick={() => navigate("/dashboard/user/orders")}
                        >
                          View My Orders
                        </button>
                        <button
                          className="btn btn-outline-secondary rounded-pill"
                          onClick={() => navigate("/")}
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  )}

                  {paymentStatus === "failed" && (
                    <div className="card-body text-center py-5">
                      <div
                        className="error-icon mb-4"
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "0 auto",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i
                          className="bi bi-x-lg text-white"
                          style={{ fontSize: "3rem" }}
                        ></i>
                      </div>

                      <h2 className="fw-bold mb-3 text-danger">
                        Payment Failed
                      </h2>

                      <p className="text-muted mb-4">
                        Unfortunately, your payment could not be processed.
                        Please try again.
                      </p>

                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-danger btn-lg rounded-pill fw-bold"
                          onClick={() => navigate("/cart")}
                        >
                          Try Again
                        </button>
                        <button
                          className="btn btn-outline-secondary rounded-pill"
                          onClick={() => navigate("/")}
                        >
                          Back to Home
                        </button>
                      </div>
                    </div>
                  )}

                  {paymentStatus === "error" && (
                    <div className="card-body text-center py-5">
                      <div
                        className="error-icon mb-4"
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "0 auto",
                          borderRadius: "50%",
                          background: "#6c757d",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <i
                          className="bi bi-exclamation-triangle text-white"
                          style={{ fontSize: "3rem" }}
                        ></i>
                      </div>

                      <h2 className="fw-bold mb-3 text-secondary">
                        Something Went Wrong
                      </h2>

                      <p className="text-muted mb-4">
                        We couldn't verify your payment. Please contact support
                        if money was deducted.
                      </p>

                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-secondary btn-lg rounded-pill fw-bold"
                          onClick={() => navigate("/contact")}
                        >
                          Contact Support
                        </button>
                        <button
                          className="btn btn-outline-secondary rounded-pill"
                          onClick={() => navigate("/")}
                        >
                          Back to Home
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Layout>
  );
};

export default PaymentSuccess;
