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
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <Layout title={"Your Profile - All-Mart"}>
            <div className="container-fluid py-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3">
                        <UserMenu />
                    </div>

                    {/* Main content */}
                    <div className="col-md-9">
                        <h2 className="mb-4 fw-bold text-primary">
                            <i className="bi bi-person-circle me-2"></i> Your Profile
                        </h2>

                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-light fw-bold">
                                <i className="bi bi-pencil-square me-2"></i> Update Your Information
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="nameInput" className="form-label">
                                            <i className="bi bi-person me-2 text-info"></i> Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nameInput"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="emailInput" className="form-label">
                                            <i className="bi bi-envelope me-2 text-success"></i> Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="emailInput"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="passwordInput" className="form-label">
                                            <i className="bi bi-lock me-2 text-warning"></i> Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="passwordInput"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter new password (optional)"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="phoneInput" className="form-label">
                                            <i className="bi bi-telephone me-2 text-danger"></i> Phone
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phoneInput"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter your phone"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="addressInput" className="form-label">
                                            <i className="bi bi-geo-alt me-2 text-primary"></i> Address
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="addressInput"
                                            rows="3"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your address"
                                            required
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">
                                        <i className="bi bi-save me-2"></i> Update Profile
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profiles;
