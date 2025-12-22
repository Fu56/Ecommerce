import React from 'react'
import Layout from "../components/Layout/Layout.jsx";

const Policy=()=>{
    return(
        <Layout title={"Privacy Policy - All-Mart"}>
            <div className="row policy-container p-4">
                <div className="col-md-6 ">
                    <img
                        src="/images/contactus.jpeg"
                        alt="privacypolicy"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="bg-dark p-2 text-white text-center mb-4">PRIVACY POLICY</h1>
                    <p>
                        Welcome to our Privacy Policy page. We are committed to protecting your privacy.
                        This policy explains how we collect, use, disclose, and safeguard your information
                        when you visit our website and use our services.
                    </p>
                    <p>
                        We collect personal information that you voluntarily provide to us when you register
                        on the website, express an interest in obtaining information about us or our products
                        and services, when you participate in activities on the website, or otherwise when
                        you contact us.
                    </p>
                    <p>
                        We may use the information we collect from you to personalize your experience,
                        improve our website, improve customer service, process transactions, send periodic emails,
                        and administer a contest, promotion, survey, or other site feature.
                    </p>
                    <p>
                        Your information, whether public or private, will not be sold, exchanged, transferred,
                        or given to any other company for any reason whatsoever, without your consent, other
                        than for the express purpose of delivering the purchased product or service requested.
                    </p>
                </div>
            </div>
        </Layout>
    )
}
export default Policy
