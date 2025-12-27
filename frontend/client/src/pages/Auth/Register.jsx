import React, { useState } from "react";
import Layout from "../../components/Layout/Layout.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    } else {
      try {
        const res = await axios.post("/api/v1/auth/register", {
          name,
          email,
          password,
          phone,
          address,
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
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <Layout title={"Register - All-Mart"}>
      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: "550px" }}>
          <h1 className="auth-title">Join All-Mart</h1>
          <p className="auth-subtitle">
            Create your account to start shopping premium products.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold small text-muted text-uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold small text-muted text-uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
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
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold small text-muted text-uppercase">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  placeholder="+1 234 567 890"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold small text-muted text-uppercase">
                Shipping Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                placeholder="123 Shopping St, NYC"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold small text-muted text-uppercase">
                Security Question: Favorite Sport?
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                placeholder="e.g. Football"
                required
              />
            </div>

            <button type="submit" className="btn auth-btn w-100 mb-4">
              Create Account
            </button>

            <div className="text-center">
              <span className="text-muted">Already have an account? </span>
              <button
                type="button"
                className="forgot-btn fw-bold ms-1"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
