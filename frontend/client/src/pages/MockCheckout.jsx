import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const MockCheckout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const tx_ref = searchParams.get("tx_ref");
  const amount = searchParams.get("amount");

  const handlePayment = (success) => {
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      if (success) {
        navigate(`/payment/success?tx_ref=${tx_ref}`);
      } else {
        navigate(`/payment/success?tx_ref=${tx_ref}&status=failed`);
      }
    }, 2000);
  };

  return (
    <Layout title="Mock Payment Gateway">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div
                    className="mb-3"
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
                    }}
                  >
                    <i
                      className="bi bi-credit-card text-white"
                      style={{ fontSize: "2.5rem" }}
                    ></i>
                  </div>

                  <h2 className="fw-bold mb-2">Mock Payment Gateway</h2>
                  <p className="text-muted">This is a test payment page</p>
                </div>

                <div className="bg-light rounded-3 p-4 mb-4">
                  <h6 className="text-uppercase small text-muted fw-bold mb-3">
                    Payment Details
                  </h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Transaction Ref:</span>
                    <span className="fw-bold small">{tx_ref}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Amount:</span>
                    <span className="fw-bold text-success fs-5">
                      ETB {amount}
                    </span>
                  </div>
                </div>

                <div className="alert alert-info mb-4">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>Test Mode:</strong> This is a mock payment gateway for
                  testing. No real payment will be processed.
                </div>

                {processing ? (
                  <div className="text-center py-4">
                    <div
                      className="spinner-border text-primary mb-3"
                      role="status"
                    >
                      <span className="visually-hidden">Processing...</span>
                    </div>
                    <p className="text-muted">Processing your payment...</p>
                  </div>
                ) : (
                  <div className="d-grid gap-3">
                    <button
                      className="btn btn-success btn-lg rounded-pill fw-bold"
                      onClick={() => handlePayment(true)}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Simulate Successful Payment
                    </button>

                    <button
                      className="btn btn-danger btn-lg rounded-pill fw-bold"
                      onClick={() => handlePayment(false)}
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Simulate Failed Payment
                    </button>

                    <button
                      className="btn btn-outline-secondary rounded-pill"
                      onClick={() => navigate("/cart")}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MockCheckout;
