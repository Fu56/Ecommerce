import React from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout title={"Admin Dashboard - All-Mart"}>
            <div className="container-fluid py-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>

                    {/* Main content */}
                    <div className="col-md-9">
                        <div className="card shadow-sm border-0">
                            <div className="card-header bg-primary text-white fw-bold">
                                <i className="bi bi-speedometer2 me-2"></i> Admin Dashboard
                            </div>
                            <div className="card-body">
                                <h5 className="mb-3">
                                    <i className="bi bi-person-circle me-2 text-primary"></i>
                                    Name: <span className="fw-normal">{auth?.user?.name}</span>
                                </h5>
                                <h5 className="mb-3">
                                    <i className="bi bi-envelope me-2 text-success"></i>
                                    Email: <span className="fw-normal">{auth?.user?.email}</span>
                                </h5>
                                <h5 className="mb-3">
                                    <i className="bi bi-telephone me-2 text-info"></i>
                                    Contact: <span className="fw-normal">{auth?.user?.phone}</span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
