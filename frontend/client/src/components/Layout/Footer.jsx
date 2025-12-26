import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <footer className="footer-premium">
      {/* Back to Top */}
      <button
        className={`back-to-top ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
        title="Go to top"
      >
        <i className="bi bi-arrow-up-short"></i>
      </button>

      <div className="footer-top py-5">
        <div className="container">
          <div className="row g-4">
            {/* Brand Section */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-brand-section">
                <h2 className="brand-text-footer mb-3">All-Mart</h2>
                <p className="footer-description mb-4">
                  Experience premium shopping with our curated collections. We
                  provide high-quality products, secured payments, and
                  exceptional customer service directly to your doorstep.
                </p>
                <div className="footer-social-links">
                  <a href="#" className="social-icon">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-heading mb-4">Shop</h5>
              <ul className="footer-links list-unstyled">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="footer-heading mb-4">Support</h5>
              <ul className="footer-links list-unstyled">
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="col-lg-4 col-md-6">
              <h5 className="footer-heading mb-4">Newsletter</h5>
              <p className="footer-description mb-4">
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </p>
              <form
                className="footer-newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control rounded-pill-start border-0 px-4"
                    placeholder="Enter your email"
                    aria-label="Email"
                  />
                  <button
                    className="btn btn-primary rounded-pill-end px-4 fw-bold"
                    type="submit"
                  >
                    Join
                  </button>
                </div>
              </form>
              <div className="payment-methods mt-4">
                <span className="small text-muted d-block mb-2">
                  Secure Payments with:
                </span>
                <div className="d-flex gap-3 fs-3 text-muted">
                  <i className="bi bi-credit-card-2-front" title="Card"></i>
                  <img
                    src="https://chapa.co/favicon.ico"
                    alt="Chapa"
                    style={{
                      width: "24px",
                      height: "24px",
                      filter: "grayscale(1)",
                      opacity: "0.6",
                    }}
                    title="Chapa"
                  />
                  <i className="bi bi-shield-check" title="Secured"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom py-4 border-top border-secondary border-opacity-25 mt-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0 copyright-text">
                &copy; {new Date().getFullYear()}{" "}
                <span className="fw-bold">All-Mart</span>. All Rights Reserved.
                Designed by <span className="designer-name">Fuad Abdela</span>
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <div className="footer-bottom-links">
                <Link
                  to="/terms"
                  className="small text-muted me-3 text-decoration-none"
                >
                  Terms
                </Link>
                <Link
                  to="/policy"
                  className="small text-muted me-3 text-decoration-none"
                >
                  Privacy
                </Link>
                <Link
                  to="/contact"
                  className="small text-muted text-decoration-none"
                >
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
