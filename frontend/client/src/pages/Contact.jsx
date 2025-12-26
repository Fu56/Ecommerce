import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { BiMailSend, BiPhoneCall, BiSupport, BiMap } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us - All-Mart"}>
      <div className="container py-5 mt-4">
        <div className="text-center mb-5">
          <h6 className="text-primary fw-bold text-uppercase letter-spacing-1 mb-2">
            Get In Touch
          </h6>
          <h1 className="fw-bold display-4">
            We're Here to <span className="brand-text">Help You</span>
          </h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Have a question about a product or order? Our dedicated support team
            is available 24/7 to ensure your shopping experience is seamless.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Contact Methods */}
          <div className="col-lg-5">
            <div className="row g-4 h-100">
              <div className="col-12">
                <div className="p-4 rounded-4 bg-white shadow-sm border h-100 d-flex align-items-start gap-3 transition-hover">
                  <div className="contact-icon-box bg-primary text-white">
                    <BiMailSend className="fs-3" />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Email Us</h5>
                    <p className="text-muted mb-0 small">support@allmart.com</p>
                    <p className="text-muted mb-0 small">info@allmart.com</p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="p-4 rounded-4 bg-white shadow-sm border h-100 d-flex align-items-start gap-3 transition-hover">
                  <div className="contact-icon-box bg-success text-white">
                    <BiPhoneCall className="fs-3" />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Call Anywhere</h5>
                    <p className="text-muted mb-0 small">+251 911 223344</p>
                    <p className="text-muted mb-0 small">
                      011 654 3210 (Direct)
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="p-4 rounded-4 bg-white shadow-sm border h-100 d-flex align-items-start gap-3 transition-hover">
                  <div className="contact-icon-box bg-warning text-white">
                    <BiSupport className="fs-3" />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Support Line</h5>
                    <p className="text-muted mb-0 small">
                      1800-0000-0000 (Toll Free)
                    </p>
                    <p className="text-muted mb-0 small">Active 24/7 Service</p>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="p-4 rounded-4 bg-white shadow-sm border h-100 d-flex align-items-start gap-3 transition-hover">
                  <div className="contact-icon-box bg-info text-white">
                    <BiMap className="fs-3" />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1">Our Office</h5>
                    <p className="text-muted mb-0 small">
                      123 Business Avenue, Addis Ababa
                    </p>
                    <p className="text-muted mb-0 small">
                      Ethiopia, East Africa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="p-5 rounded-4 bg-white shadow-lg border-0 h-100">
              <h3 className="fw-bold mb-4">Send a Message</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-600">Your Name</label>
                    <input
                      type="text"
                      className="form-control rounded-pill px-3 py-2 border shadow-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-600">Email Address</label>
                    <input
                      type="email"
                      className="form-control rounded-pill px-3 py-2 border shadow-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label fw-600">Subject</label>
                    <input
                      type="text"
                      className="form-control rounded-pill px-3 py-2 border shadow-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div className="col-12 mb-4">
                    <label className="form-label fw-600">Message</label>
                    <textarea
                      className="form-control rounded-4 px-3 py-2 border shadow-none"
                      rows="5"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary rounded-pill px-5 py-3 fw-bold w-100 shadow-sm transition-hover border-0"
                      style={{
                        background: "linear-gradient(135deg, #1a2a6c, #b21f1f)",
                      }}
                    >
                      <i className="bi bi-send-fill me-2"></i> Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .letter-spacing-1 {
          letter-spacing: 2px;
        }
        .contact-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .fw-600 {
          font-weight: 600;
        }
        .transition-hover {
          transition: all 0.3s ease;
        }
        .transition-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05) !important;
          border-color: #667eea !important;
        }
      `}</style>
    </Layout>
  );
};

export default Contact;
