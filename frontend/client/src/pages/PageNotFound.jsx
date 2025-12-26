import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"404 - Page Not Found"}>
      <div className="pnf-container">
        {/* Animated Background Elements */}
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>

        <div className="pnf-glass-card">
          <div className="pnf-content-inner">
            <h1 className="pnf-404-text">404</h1>
            <div className="pnf-divider"></div>
            <h2 className="pnf-subtitle">Whoops! You've drifted into space.</h2>
            <p className="pnf-description">
              The page you're looking for has vanished into the digital void.
              Don't worry, even the best explorers get lost sometimes.
            </p>
            <div className="pnf-actions">
              <Link to="/" className="pnf-btn pnf-btn-primary">
                <i className="bi bi-rocket-takeoff-fill me-2"></i>
                Back to Earth
              </Link>
              <Link to="/contact" className="pnf-btn pnf-btn-secondary">
                <i className="bi bi-chat-dots-fill me-2"></i>
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pnf-container {
          min-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #fdfdfd;
          padding: 2rem;
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 1;
          opacity: 0.6;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          background: rgba(26, 42, 108, 0.2);
          top: -100px;
          left: -100px;
          animation: float-blob 20s infinite alternate;
        }

        .shape-2 {
          width: 300px;
          height: 300px;
          background: rgba(178, 31, 31, 0.15);
          bottom: -50px;
          right: -50px;
          animation: float-blob 15s infinite alternate-reverse;
        }

        .shape-3 {
          width: 250px;
          height: 250px;
          background: rgba(253, 187, 45, 0.2);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: float-blob 25s infinite linear;
        }

        @keyframes float-blob {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate(30px, -50px) rotate(120deg) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg) scale(0.9);
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
          }
        }

        .pnf-glass-card {
          z-index: 2;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 40px;
          padding: 5rem 3rem;
          max-width: 650px;
          width: 100%;
          text-align: center;
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.1);
          animation: pnf-reveal 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes pnf-reveal {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(40px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .pnf-404-text {
          font-size: 10rem;
          font-weight: 900;
          margin: 0;
          background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          letter-spacing: -8px;
          filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
          animation: text-float 4s ease-in-out infinite;
        }

        @keyframes text-float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        .pnf-divider {
          width: 80px;
          height: 6px;
          background: linear-gradient(to right, #1a2a6c, #b21f1f);
          margin: 2rem auto;
          border-radius: 10px;
        }

        .pnf-subtitle {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1a2a6c;
          margin-bottom: 1.5rem;
          font-family: "Playfair Display", serif;
          letter-spacing: -0.5px;
        }

        .pnf-description {
          color: #555;
          font-size: 1.15rem;
          margin-bottom: 3rem;
          line-height: 1.7;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .pnf-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .pnf-btn {
          padding: 1rem 2.5rem;
          border-radius: 16px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: inline-flex;
          align-items: center;
          font-size: 1.1rem;
          border: none;
        }

        .pnf-btn-primary {
          background: linear-gradient(135deg, #1a2a6c, #b21f1f);
          color: white;
          box-shadow: 0 15px 35px rgba(26, 42, 108, 0.25);
        }

        .pnf-btn-primary:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 45px rgba(26, 42, 108, 0.35);
          color: white;
        }

        .pnf-btn-secondary {
          background: #f8f9fa;
          color: #1a2a6c;
          border: 1px solid #e9ecef;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
        }

        .pnf-btn-secondary:hover {
          transform: translateY(-5px);
          background: #fff;
          border-color: #1a2a6c;
          color: #1a2a6c;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 768px) {
          .pnf-glass-card {
            padding: 4rem 2rem;
          }
          .pnf-404-text {
            font-size: 7rem;
            letter-spacing: -4px;
          }
          .pnf-subtitle {
            font-size: 2rem;
          }
        }

        @media (max-width: 576px) {
          .pnf-container {
            padding: 1rem;
          }
          .pnf-404-text {
            font-size: 5.5rem;
          }
          .pnf-subtitle {
            font-size: 1.75rem;
          }
          .pnf-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </Layout>
  );
};

export default PageNotFound;
