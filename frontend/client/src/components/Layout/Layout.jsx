import React from 'react';
import { Helmet } from 'react-helmet';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <header><Header/></header>
            <main style={{minHeight:'75vh'}}>{children}</main>
            <footer><Footer/></footer>
        </div>
    );
};

Layout.defaultProps = {
    title: "All-Mart - Shop Now",
    description: "MERN Stack E-commerce Project",
    keywords: "MERN, React, Node, MongoDB, Express, E-commerce",
    author: "Fuad Abdela",
};

export default Layout;

