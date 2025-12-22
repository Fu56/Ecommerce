import React from 'react'
import Layout from "../components/Layout/Layout.jsx";

const About=()=>{
    return(
        <Layout>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/about.jpeg"
                        alt="aboutus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark p-2 text-white text-center">ABOUT US</h1>
                    <p className="text-justify mt-2">
                        Welcome to our e-commerce platform, your one-stop destination for all your shopping needs.
                        We are dedicated to providing you with the best products, focusing on quality, customer service,
                        and uniqueness. Founded in 2023, our store has come a long way from its beginnings.
                        When we first started out, our passion for "eco-friendly cleaning products" drove us to
                        start our own business.
                    </p>
                </div>
            </div>
        </Layout>
    )
}
export default  About
