import React from 'react'
import Layout from "../components/Layout/Layout.jsx";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact=()=>{
    return(
        <Layout title={"Contact Us - All-Mart"}>
            <div className="row contactus">
                <div className="col-md-6">
                    <img src="/images/contactus.jpeg" 
                         alt="contactus"  
                         style={{width:"100%"}}
                    />
                </div>
                <div className="col-md-4">
                    <h1 className="bg-dark text-white p-2 text-center">CONTACT US</h1>
                        <p className="text-justify mt-2">
                            Any query and info about product, feel free to call anytime. We are available 24*7.
                        </p>
                        <p className="mt-3">
                            <BiMailSend /> : www.help@ecommerceapp.com
                        </p>
                        <p className="mt-3">
                            <BiPhoneCall /> : 012-3456789
                        </p>
                        <p className="mt-3">
                            <BiSupport /> : 1800-0000-0000 (toll free)
                        </p>
                </div>
            </div>
        </Layout>
    )
}
export default  Contact
