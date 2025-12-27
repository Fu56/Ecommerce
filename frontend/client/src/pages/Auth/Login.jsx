import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout title={"Login - All-Mart"}>
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Great to see you again!</p>

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

            <div className="mb-3">
              <label className="form-label fw-bold small text-muted text-uppercase">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="text-end mb-4">
              <button
                type="button"
                className="forgot-btn"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot password?
              </button>
            </div>

            <button type="submit" className="btn auth-btn w-100 mb-4">
              Log In
            </button>

            <div className="text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/register" className="auth-link">
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
