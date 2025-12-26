import React from "react";
import Layout from "../components/Layout/Layout.jsx";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - All-Mart"}>
      <div className="container py-5 mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
              {/* Header Gradient */}
              <div
                className="p-5 text-center text-white"
                style={{
                  background: "linear-gradient(135deg, #00b09b, #96c93d)",
                }}
              >
                <i className="bi bi-shield-lock display-1 mb-3 opacity-75"></i>
                <h1 className="fw-bold mb-0">Privacy Policy</h1>
                <p className="opacity-75 mt-2">Your Privacy is Our Priority</p>
              </div>

              <div className="card-body p-5 bg-white">
                <section className="mb-5">
                  <h4 className="fw-bold text-success mb-3">
                    1. Information Collection
                  </h4>
                  <p className="text-muted leading-relaxed">
                    We collect information from you when you register on our
                    site, place an order, or subscribe to our newsletter. When
                    ordering or registering on our site, as appropriate, you may
                    be asked to enter your: name, e-mail address, mailing
                    address, phone number or credit card information.
                  </p>
                </section>

                <section className="mb-5">
                  <h4 className="fw-bold text-success mb-3">2. Data Usage</h4>
                  <p className="text-muted leading-relaxed">
                    Any of the information we collect from you may be used in
                    one of the following ways:
                  </p>
                  <ul className="text-muted">
                    <li className="mb-2">
                      To personalize your experience and meet individual needs.
                    </li>
                    <li className="mb-2">
                      To improve our website based on the information we
                      receive.
                    </li>
                    <li className="mb-2">
                      To improve customer service and support needs.
                    </li>
                    <li className="mb-2">
                      To process transactions efficiently and securely.
                    </li>
                  </ul>
                </section>

                <section className="mb-5">
                  <h4 className="fw-bold text-success mb-3">
                    3. Data Protection
                  </h4>
                  <p className="text-muted leading-relaxed">
                    We implement a variety of security measures to maintain the
                    safety of your personal information when you place an order
                    or enter, submit, or access your personal information. We
                    offer the use of a secure server via SSL encryption.
                  </p>
                </section>

                <section className="mb-5">
                  <h4 className="fw-bold text-success mb-3">
                    4. Third Party Disclosure
                  </h4>
                  <p className="text-muted leading-relaxed">
                    We do not sell, trade, or otherwise transfer to outside
                    parties your personally identifiable information. This does
                    not include trusted third parties who assist us in operating
                    our website, conducting our business, or servicing you, so
                    long as those parties agree to keep this information
                    confidential.
                  </p>
                </section>

                <section className="mb-0 pt-4 border-top">
                  <p className="text-center text-muted small mb-0">
                    If you have questions regarding our privacy practices,
                    please contact our privacy officer at
                    <a
                      href="mailto:privacy@allmart.com"
                      className="ms-1 text-success text-decoration-none fw-bold"
                    >
                      privacy@allmart.com
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

export default Policy;
