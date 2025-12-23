import React, { useState } from 'react';
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
                const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
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
                toast.error("Something went wrong");
            }
        }
    }

    return (
        <Layout title={"Register - All-Mart"}>
            <div className="register">
                <h1>Register Here</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-control"
                            id="nameInput"
                            placeholder="Enter Your Name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="emailInput"
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="passwordInput"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="form-control"
                            id="phoneInput"
                            placeholder="Enter Your Phone"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="form-control"
                            id="addressInput"
                            placeholder="Enter Your Address"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="answerInput"
                            placeholder="What is your favorite sport?"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        REGISTER
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
