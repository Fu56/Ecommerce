import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - All-Mart"}>
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Reset Access</h1>
          <p className="auth-subtitle">Recover your account in a few steps.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="mb-4">
              <label className="form-label fw-bold small text-muted text-uppercase">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-muted text-uppercase">
                Secret Question: Favorite Sport?
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                placeholder="Answer your security question"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-muted text-uppercase">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="form-control"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn auth-btn w-100 mb-4">
              Reset Password
            </button>

            <div className="text-center">
              <button
                type="button"
                className="forgot-btn fw-bold"
                onClick={() => navigate("/login")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
