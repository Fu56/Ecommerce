import React from "react";
import Layout from "../components/Layout/Layout.jsx";

const About = () => {
  return (
    <Layout title={"About Our Story - All-Mart"}>
      <div className="container py-5 mt-4">
        {/* Hero Section */}
        <div className="row align-items-center mb-5 gx-5">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <div className="position-relative">
              <img
                src="/images/about.jpeg"
                alt="Our Story"
                className="img-fluid rounded-4 shadow-lg"
                style={{ objectFit: "cover", width: "100%", height: "450px" }}
              />
              <div
                className="position-absolute bottom-0 end-0 bg-white p-4 rounded-4 shadow-sm m-3 d-none d-md-block"
                style={{ maxWidth: "200px" }}
              >
                <h2 className="fw-bold brand-text mb-0">10k+</h2>
                <small className="text-muted">Happy Customers Globally</small>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h6 className="text-primary fw-bold text-uppercase letter-spacing-1 mb-3">
              Our Legacy
            </h6>
            <h1 className="fw-bold mb-4 display-4">
              Crafting Excellence Since <span className="brand-text">2023</span>
            </h1>
            <p className="lead text-muted mb-4">
              Welcome to All-Mart, your one-stop destination for curated premium
              lifestyle products. What started as a small passion project has
              grown into a community of quality-driven enthusiasts.
            </p>
            <p className="text-muted mb-4">
              We believe that shopping shouldn't just be about buying—it should
              be an experience. Every product in our catalog is handpicked for
              its durability, ethics, and aesthetic value. We are dedicated to
              providing you with the very best, with a focus on reliability,
              customer service, and uniqueness.
            </p>
            <div className="d-flex gap-3">
              <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
                Explore Collections
              </button>
              <button className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-bold">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Vision & Values */}
        <div className="row g-4 py-5 mt-4">
          <div className="col-md-4">
            <div className="p-5 rounded-4 bg-white shadow-sm border h-100 text-center transition-hover">
              <div className="icon-box-about mb-4 mx-auto bg-soft-primary text-primary">
                <i className="bi bi-eye fs-2"></i>
              </div>
              <h4 className="fw-bold mb-3">Our Vision</h4>
              <p className="text-muted small">
                To become the world's most customer-centric destination where
                people can find and discover anything they want to buy online.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-5 rounded-4 bg-white shadow-sm border h-100 text-center transition-hover">
              <div className="icon-box-about mb-4 mx-auto bg-soft-success text-success">
                <i className="bi bi-shield-check fs-2"></i>
              </div>
              <h4 className="fw-bold mb-3">Quality Promise</h4>
              <p className="text-muted small">
                We never compromise on quality. Every item undergoes a rigorous
                5-step quality check before reaching your doorstep.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-5 rounded-4 bg-white shadow-sm border h-100 text-center transition-hover">
              <div className="icon-box-about mb-4 mx-auto bg-soft-warning text-warning">
                <i className="bi bi-globe fs-2"></i>
              </div>
              <h4 className="fw-bold mb-3">Eco-Friendly</h4>
              <p className="text-muted small">
                We are committed to sustainability. 80% of our packaging is
                biodegradable and our shipping is carbon-neutral.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .letter-spacing-1 {
          letter-spacing: 2px;
        }
        .bg-soft-primary {
          background-color: rgba(102, 126, 234, 0.1);
        }
        .bg-soft-success {
          background-color: rgba(40, 167, 69, 0.1);
        }
        .bg-soft-warning {
          background-color: rgba(255, 193, 7, 0.1);
        }
        .icon-box-about {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .transition-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
          border-color: #667eea !important;
        }
      `}</style>
    </Layout>
  );
};

export default About;
