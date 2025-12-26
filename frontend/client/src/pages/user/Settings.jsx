import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Settings = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // Load settings from localStorage or defaults
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("allmart_theme") === "dark";
  });
  const [notifications, setNotifications] = useState(() => {
    return localStorage.getItem("allmart_notifications") !== "false";
  });
  const [emailAlerts, setEmailAlerts] = useState(() => {
    return localStorage.getItem("allmart_email_alerts") !== "false";
  });

  // Apply theme change
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme-active");
      localStorage.setItem("allmart_theme", "dark");
    } else {
      document.body.classList.remove("dark-theme-active");
      localStorage.setItem("allmart_theme", "light");
    }
  }, [darkMode]);

  // Persist other settings
  useEffect(() => {
    localStorage.setItem("allmart_notifications", notifications);
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("allmart_email_alerts", emailAlerts);
  }, [emailAlerts]);

  const handleResetPrivacy = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all site preferences to default?"
      )
    ) {
      setNotifications(true);
      setEmailAlerts(true);
      setDarkMode(false);
      toast.info("Preferences reset to default");
    }
  };

  const handleSignOutAll = () => {
    if (
      window.confirm("This will log you out from this device. Confirm logout?")
    ) {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Successfully signed out from all sessions");
      navigate("/login");
    }
  };

  const handleDeleteAccount = () => {
    toast.error(
      "Account deletion requires admin verification. Please contact support@allmart.com"
    );
  };

  const handleToggle2FA = () => {
    toast.warning(
      "Two-Factor Authentication is currently in beta. Coming soon!"
    );
  };

  return (
    <Layout title={"Your Settings - All-Mart"}>
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
                  <i className="bi bi-gear-wide-connected me-2"></i> Application
                  Settings
                </h2>
                <button
                  className="btn btn-sm btn-link text-decoration-none text-muted"
                  onClick={() => toast.success("Settings updated successfully")}
                >
                  <i className="bi bi-cloud-check me-1"></i> Changes auto-saved
                </button>
              </div>

              <div className="row g-4">
                {/* Preferences Group */}
                <div className="col-lg-6">
                  <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                    <div className="card-header border-0 bg-light p-3 px-4 fw-bold text-muted small text-uppercase">
                      Interface Preferences
                    </div>
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                          <h6 className="fw-bold mb-1">Dark Mode Appearance</h6>
                          <p className="text-muted small mb-0">
                            Switch to a darker color scheme
                          </p>
                        </div>
                        <div className="form-check form-switch p-0">
                          <input
                            className="form-check-input ms-0 mt-0 shadow-none clickable"
                            type="checkbox"
                            role="switch"
                            style={{
                              width: "2.5rem",
                              height: "1.25rem",
                              cursor: "pointer",
                            }}
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                          />
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="fw-bold mb-1">Push Notifications</h6>
                          <p className="text-muted small mb-0">
                            Receive desktop order updates
                          </p>
                        </div>
                        <div className="form-check form-switch p-0">
                          <input
                            className="form-check-input ms-0 mt-0 shadow-none clickable"
                            type="checkbox"
                            role="switch"
                            style={{
                              width: "2.5rem",
                              height: "1.25rem",
                              cursor: "pointer",
                            }}
                            checked={notifications}
                            onChange={() => setNotifications(!notifications)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security/Communication Group */}
                <div className="col-lg-6">
                  <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                    <div className="card-header border-0 bg-light p-3 px-4 fw-bold text-muted small text-uppercase">
                      Communication
                    </div>
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                          <h6 className="fw-bold mb-1">Email Marketing</h6>
                          <p className="text-muted small mb-0">
                            Weekly deals and new arrivals
                          </p>
                        </div>
                        <div className="form-check form-switch p-0">
                          <input
                            className="form-check-input ms-0 mt-0 shadow-none clickable"
                            type="checkbox"
                            role="switch"
                            style={{
                              width: "2.5rem",
                              height: "1.25rem",
                              cursor: "pointer",
                            }}
                            checked={emailAlerts}
                            onChange={() => setEmailAlerts(!emailAlerts)}
                          />
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h6 className="fw-bold mb-1">Two-Factor Auth</h6>
                          <p className="text-muted small mb-0">
                            Enhance your account security
                          </p>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-primary rounded-pill px-3 fw-bold"
                          onClick={handleToggle2FA}
                        >
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy/Account Actions */}
                <div className="col-12 mt-4">
                  <div className="card border-0 shadow-sm rounded-4 bg-light p-4">
                    <h5 className="fw-bold text-danger mb-3">Danger Zone</h5>
                    <div className="row g-3">
                      <div className="col-md-6 col-lg-4">
                        <button
                          className="btn btn-outline-danger w-100 rounded-pill py-2 shadow-none transition-hover bg-white"
                          onClick={handleResetPrivacy}
                        >
                          <i className="bi bi-shield-x me-2"></i> Reset Privacy
                          Settings
                        </button>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <button
                          className="btn btn-outline-danger w-100 rounded-pill py-2 shadow-none transition-hover bg-white"
                          onClick={handleSignOutAll}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i> Sign
                          Out All Devices
                        </button>
                      </div>
                      <div className="col-md-12 col-lg-4">
                        <button
                          className="btn btn-danger w-100 rounded-pill py-2 shadow-sm transition-hover border-0"
                          onClick={handleDeleteAccount}
                        >
                          <i className="bi bi-trash3-fill me-2"></i> Delete
                          Account Permanent
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transition-hover {
          transition: all 0.3s ease;
        }
        .transition-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 15px rgba(220, 53, 69, 0.2) !important;
        }
        .clickable {
          cursor: pointer;
        }
      `}</style>
    </Layout>
  );
};

export default Settings;
