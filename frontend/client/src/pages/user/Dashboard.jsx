import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from "../../components/Layout/UserMenu.jsx";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - All-Mart"}>
      <div className="container-fluid py-5">
        <div className="row g-4">
          <div className="col-md-3">
              <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow-lg border-0 rounded-3">
              <div className="card-header bg-dark text-white p-4">
                <h3 className="mb-0">
                  <i className="bi bi-speedometer2 me-2"></i> User Dashboard
                </h3>
              </div>
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-4 text-center mb-4 mb-md-0">
                    <div className="display-1 text-primary">
                      <i className="bi bi-person-circle"></i>
                    </div>
                    <h4 className="mt-2">{auth?.user?.name}</h4>
                    <span className="badge bg-info text-dark">User</span>
                  </div>
                  <div className="col-md-8">
                    <div className="p-4 bg-light rounded shadow-sm">
                      <h5 className="mb-3 border-bottom pb-2">
                        <i className="bi bi-info-circle me-2 text-info"></i>
                        User Information
                      </h5>
                      <p className="mb-2">
                        <strong>Name:</strong> {auth?.user?.name}
                      </p>
                      <p className="mb-2">
                        <strong>Email:</strong> {auth?.user?.email}
                      </p>
                      <p className="mb-0">
                        <strong>Address:</strong> {auth?.user?.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
