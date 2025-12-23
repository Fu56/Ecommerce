import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Settings = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
    };

    const handleNotificationsToggle = () => {
        setNotifications(!notifications);
    };

    return (
        <Layout title={"Your Settings - All-Mart"}>
            <div className="container-fluid py-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3">
                        <UserMenu />
                    </div>

                    {/* Main content */}
                    <div className="col-md-9">
                        <h2 className="mb-4 fw-bold text-primary">
                            <i className="bi bi-gear me-2"></i> User Settings
                        </h2>

                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-light fw-bold">
                                <i className="bi bi-sliders me-2"></i> Preferences
                            </div>
                            <div className="card-body">
                                {/* Theme Toggle */}
                                <div className="form-check form-switch mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="themeSwitch"
                                        checked={darkMode}
                                        onChange={handleThemeToggle}
                                    />
                                    <label className="form-check-label" htmlFor="themeSwitch">
                                        <i className="bi bi-moon-stars me-2 text-warning"></i>
                                        {darkMode ? "Dark Mode Enabled" : "Light Mode Enabled"}
                                    </label>
                                </div>

                                {/* Notifications Toggle */}
                                <div className="form-check form-switch mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="notificationsSwitch"
                                        checked={notifications}
                                        onChange={handleNotificationsToggle}
                                    />
                                    <label className="form-check-label" htmlFor="notificationsSwitch">
                                        <i className="bi bi-bell me-2 text-info"></i>
                                        {notifications ? "Notifications Enabled" : "Notifications Disabled"}
                                    </label>
                                </div>

                                {/* Account Actions */}
                                <div className="mt-4">
                                    <button className="btn btn-outline-danger w-100 mb-2">
                                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                                    </button>
                                    <button className="btn btn-outline-secondary w-100">
                                        <i className="bi bi-trash me-2"></i> Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
