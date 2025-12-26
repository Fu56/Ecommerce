import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";

const Profiles = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // get user data
  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, [auth?.user]);

  // form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("✨ Profile Updated Successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Your Profile - All-Mart"}>
      <div className="container-fluid py-5">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Main content */}
          <div className="col-md-9">
            <div className="admin-info-card p-4 shadow-lg rounded-4 bg-white">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold brand-text m-0">
                  <i className="bi bi-person-gear me-2"></i> Manage Profile
                </h2>
                <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill fw-bold">
                  Account Security Active
                </span>
              </div>

              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div
                  className="card-header border-0 p-4"
                  style={{
                    background: "linear-gradient(135deg, #1a2a6c, #b21f1f)",
                    color: "white",
                  }}
                >
                  <p className="m-0 fw-bold small text-uppercase letter-spacing-1">
                    Personal Information & Security
                  </p>
                </div>
                <div className="card-body p-4 bg-light">
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="row">
                      {/* Left Side: Identity */}
                      <div className="col-lg-6">
                        <div className="mb-4">
                          <label className="form-label fw-600 text-muted small text-uppercase">
                            Profile Name
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-white border-end-0 text-primary">
                              <i className="bi bi-person"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control rounded-end-3 py-2 shadow-none border border-start-0"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Your full name"
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="form-label fw-600 text-muted small text-uppercase">
                            Email Address
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-white border-end-0 text-success">
                              <i className="bi bi-envelope"></i>
                            </span>
                            <input
                              type="email"
                              className="form-control rounded-end-3 py-2 shadow-none border border-start-0"
                              value={email}
                              placeholder="your@email.com"
                              disabled
                            />
                          </div>
                          <small className="text-muted mt-1 d-block">
                            <i className="bi bi-info-circle me-1"></i>Email
                            cannot be changed for security
                          </small>
                        </div>

                        <div className="mb-4">
                          <label className="form-label fw-600 text-muted small text-uppercase">
                            Change Password
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-white border-end-0 text-warning">
                              <i className="bi bi-shield-lock"></i>
                            </span>
                            <input
                              type="password"
                              className="form-control rounded-end-3 py-2 shadow-none border border-start-0"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Leave empty to keep current"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Contact */}
                      <div className="col-lg-6">
                        <div className="mb-4">
                          <label className="form-label fw-600 text-muted small text-uppercase">
                            Phone Number
                          </label>
                          <div className="input-group">
                            <span className="input-group-text bg-white border-end-0 text-danger">
                              <i className="bi bi-phone"></i>
                            </span>
                            <input
                              type="text"
                              className="form-control rounded-end-3 py-2 shadow-none border border-start-0"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="e.g. +251..."
                              required
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="form-label fw-600 text-muted small text-uppercase">
                            Delivery Address
                          </label>
                          <div className="input-group h-100">
                            <span className="input-group-text bg-white border-end-0 text-primary align-items-start pt-2">
                              <i className="bi bi-geo-alt"></i>
                            </span>
                            <textarea
                              className="form-control rounded-end-3 py-2 shadow-none border border-start-0"
                              rows="4"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="Your primary shipping address"
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-top mt-4 pt-4 text-center">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm"
                        disabled={loading}
                        style={{
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          border: "none",
                          minWidth: "250px",
                          transition: "transform 0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "translateY(-3px)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "translateY(0)")
                        }
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Saving Details...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check2-circle me-2"></i> Update
                            My Account
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .fw-600 {
          font-weight: 600;
        }
        .letter-spacing-1 {
          letter-spacing: 1px;
        }
        .bg-soft-primary {
          background-color: rgba(102, 126, 234, 0.1);
        }
      `}</style>
    </Layout>
  );
};

export default Profiles;
