import React from 'react';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Layout = ({ children }) => {
    return (
        <div>
            <header><Header/></header>
            <main style={{minHeight:'75vh'}}>{children}</main>
            <footer><Footer/></footer>
        </div>
    );
};

export default Layout;

