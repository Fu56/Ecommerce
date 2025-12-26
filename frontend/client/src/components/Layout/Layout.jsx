import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
  title = "All-Mart - Shop Now",
  description = "MERN Stack E-commerce Project",
  keywords = "MERN, React, Node, MongoDB, Express, E-commerce",
  author = "Fuad Abdela",
}) => {
  console.log("Layout rendering");
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>
      <header>
        <Header />
      </header>
      <main style={{ minHeight: "75vh" }}>
        <Toaster />
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
