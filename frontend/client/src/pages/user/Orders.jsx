import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/orders");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders - All-Mart"}>
      <div className="container-fluid py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* Main content */}
          <div className="col-md-9">
            <h2 className="mb-4 fw-bold text-primary">
              <i className="bi bi-bag-check me-2"></i> Your Orders
            </h2>

            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={order._id} className="card shadow-sm border-0 mb-4">
                  <div className="card-header bg-light fw-bold d-flex justify-content-between align-items-center">
                    <span>
                      <i className="bi bi-receipt-cutoff me-2"></i> Order #
                      {index + 1}
                    </span>
                    <span
                      className={`badge ${
                        order.status === "deliverd" ||
                        order.status === "Delivered"
                          ? "bg-success"
                          : order.status === "Processing"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Order ID:</strong> {order._id}
                      </div>
                      <div className="col-md-4">
                        <strong>Buyer:</strong> {order.buyer?.name}
                      </div>
                      <div className="col-md-4">
                        <strong>Date:</strong>{" "}
                        {moment(order.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <strong>Payment:</strong>{" "}
                        {order.payment?.status === "completed" ||
                        order.payment === "Success" ? (
                          <span className="text-success">
                            <i className="bi bi-check-circle me-1"></i> Paid
                          </span>
                        ) : (
                          <span className="text-warning">
                            <i className="bi bi-clock-history me-1"></i>{" "}
                            {order.payment?.status || "Pending"}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4">
                        <strong>Quantity:</strong> {order.products?.length}
                      </div>
                    </div>

                    <h5 className="mt-4 mb-3">
                      <i className="bi bi-box-seam me-2"></i> Products
                    </h5>
                    <div className="table-responsive">
                      <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                          <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((p, i) => (
                            <tr key={p._id}>
                              <td>{i + 1}</td>
                              <td>
                                <img
                                  src={`/api/v1/product/product-photo/${p._id}`}
                                  alt={p.name}
                                  className="img-thumbnail"
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                    objectFit: "cover",
                                  }}
                                />
                              </td>
                              <td>{p.name}</td>
                              <td>{p.description.substring(0, 50)}...</td>
                              <td>${p.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="card shadow-sm border-0">
                <div className="card-body text-center text-muted">
                  <i className="bi bi-inbox me-2"></i> No orders found.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
