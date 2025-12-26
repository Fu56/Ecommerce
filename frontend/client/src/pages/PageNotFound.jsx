import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"404 - Page Not Found"}>
      <div className="container py-5 mt-5">
        <div
          className="row justify-content-center align-items-center text-center pnf-wrapper"
          style={{ minHeight: "60vh" }}
        >
          <div className="col-md-8">
            <div className="pnf-content">
              <h1
                className="fw-bold mb-0"
                style={{
                  fontSize: "12rem",
                  background:
                    "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: "1",
                }}
              >
                404
              </h1>
              <h2 className="fw-bold text-dark mb-4 display-5">
                Oops! Page Disappeared
              </h2>
              <p
                className="text-muted mb-5 mx-auto"
                style={{ maxWidth: "500px" }}
              >
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable. Let's get you back
                on track!
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Link
                  to="/"
                  className="btn btn-primary rounded-pill px-5 py-3 fw-bold shadow-sm transition-hover border-0"
                >
                  <i className="bi bi-house-door-fill me-2"></i> Return Home
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-outline-secondary rounded-pill px-5 py-3 fw-bold transition-hover"
                >
                  Report Issue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pnf-wrapper {
          animation: fadeIn 0.8s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .transition-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
      `}</style>
    </Layout>
  );
};

export default PageNotFound;
