import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ minHeight: "80vh" }}>
        <h1
          className="text-center brand-text my-5"
          style={{ fontSize: "3rem" }}
        >
          Explore Categories
        </h1>
        <div className="row g-4 justify-content-center">
          {categories.map((c) => (
            <div className="col-md-4 col-sm-6" key={c._id}>
              <Link to={`/category/${c.slug}`} className="text-decoration-none">
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div className="card-body d-flex align-items-center justify-content-center p-5">
                    <h3 className="card-title text-center m-0 text-dark fw-bold">
                      {c.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
