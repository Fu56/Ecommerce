import React from "react";
import Layout from "../components/Layout/Layout.jsx";

const Terms = () => {
  return (
    <Layout title={"Terms & Conditions - All-Mart"}>
      <div className="container py-5 mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              {/* Header Gradient */}
              <div
                className="p-5 text-center text-white"
                style={{
                  background: "linear-gradient(135deg, #1a2a6c, #b21f1f)",
                }}
              >
                <i className="bi bi-file-earmark-text display-1 mb-3 opacity-75"></i>
                <h1 className="fw-bold mb-0">Terms & Conditions</h1>
                <p className="opacity-75 mt-2">Last Updated: January 2025</p>
              </div>

              <div className="card-body p-5 bg-white">
                <section className="mb-5">
                  <h4 className="fw-bold brand-text mb-3">1. Introduction</h4>
                  <p className="text-muted leading-relaxed">
                    Welcome to All-Mart. By accessing or using our website, you
                    agree to comply with and be bound by the following terms and
                    conditions. If you disagree with any part of these terms,
                    please do not use our services.
                  </p>
                </section>

                <section className="mb-5">
                  <h4 className="fw-bold brand-text mb-3">2. Use of License</h4>
                  <p className="text-muted leading-relaxed">
                    Permission is granted to temporarily download one copy of
                    the materials (information or software) on All-Mart's
                    website for personal, non-commercial transitory viewing
                    only. This is the grant of a license, not a transfer of
                    title.
                  </p>
                  <ul className="text-muted small">
                    <li>You may not modify or copy the materials.</li>
                    <li>
                      You may not use the materials for any commercial purpose.
                    </li>
                    <li>
                      You may not attempt to decompile or reverse engineer any
                      software.
                    </li>
                  </ul>
                </section>

                <section className="mb-5">
                  <h4 className="fw-bold brand-text mb-3">
                    3. Product Descriptions
                  </h4>
                  <p className="text-muted leading-relaxed">
                    All-Mart attempts to be as accurate as possible with product
                    descriptions. However, we do not warrant that product
                    descriptions or other content of this site is accurate,
                    complete, reliable, current, or error-free.
                  </p>
                </section>

                <section className="mb-5">
                  <h4 className="fw-bold brand-text mb-3">
                    4. Payments & Refunds
                  </h4>
                  <p className="text-muted leading-relaxed">
                    Payments are processed through secured gateways (Chapa).
                    Refunds are subject to our return policy and will be
                    processed within 7-10 business days upon approval of the
                    return.
                  </p>
                </section>

                <section className="mb-0 pt-4 border-top">
                  <p className="text-center text-muted small mb-0">
                    If you have any questions regarding these terms, please
                    contact us at
                    <a
                      href="mailto:support@allmart.com"
                      className="ms-1 text-primary text-decoration-none fw-bold"
                    >
                      support@allmart.com
                    </a>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
