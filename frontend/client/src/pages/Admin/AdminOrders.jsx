import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import Layout from "../../components/Layout/Layout.jsx";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import { useAuth } from "../../context/auth.jsx";
import moment from "moment";
import { toast } from "react-toastify";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/order/all-orders");
      if (data?.success) {
        setOrders(data.orders);
        console.log("Orders loaded:", data.orders?.length);
      } else {
        toast.error("Failed to load orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/order/order-status/${orderId}`,
        {
          status: value,
        }
      );
      toast.success("Order status updated successfully");
      getOrders();
    } catch (error) {
      console.log(error);
      toast.error("Error updating order status");
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-secondary";
      case "Processing":
        return "bg-primary";
      case "Shipped":
        return "bg-info";
      case "deliverd":
        return "bg-success";
      case "cancel":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  // Get payment status badge
  const getPaymentBadge = (payment) => {
    if (payment?.status === "completed" || payment === "Success") {
      return <span className="badge bg-success rounded-pill">Paid</span>;
    } else if (payment?.status === "pending") {
      return <span className="badge bg-warning rounded-pill">Pending</span>;
    } else {
      return <span className="badge bg-danger rounded-pill">Failed</span>;
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="admin-info-card p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h1
                  className="brand-text mb-2 mb-md-0"
                  style={{ fontSize: "2.5rem" }}
                >
                  <i className="bi bi-box-seam me-2"></i>
                  All User Orders
                </h1>
                <span className="badge bg-primary fs-6 px-3 py-2">
                  {orders.length} Total Orders
                </span>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox fs-1 d-block mb-3 text-muted"></i>
                  <h4 className="text-muted">No orders found</h4>
                  <p className="text-muted">
                    Orders will appear here when customers make purchases
                  </p>
                </div>
              ) : (
                orders.map((o, i) => {
                  return (
                    <div
                      className="border shadow-sm mb-4 rounded-4 overflow-hidden bg-white"
                      key={o._id}
                      style={{ transition: "all 0.3s" }}
                    >
                      {/* Order Header */}
                      <div
                        className="p-3"
                        style={{
                          background:
                            "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
                        }}
                      >
                        <div className="row align-items-center">
                          <div className="col-md-2 col-6 mb-2 mb-md-0">
                            <small className="text-muted d-block">
                              Order #
                            </small>
                            <strong className="brand-text">#{i + 1}</strong>
                          </div>
                          <div className="col-md-2 col-6 mb-2 mb-md-0">
                            <small className="text-muted d-block">Status</small>
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                              className="fw-bold"
                              style={{ minWidth: "130px" }}
                            >
                              {status.map((s, i) => (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </div>
                          <div className="col-md-2 col-6 mb-2 mb-md-0">
                            <small className="text-muted d-block">
                              Customer
                            </small>
                            <strong>{o?.buyer?.name || "N/A"}</strong>
                          </div>
                          <div className="col-md-2 col-6 mb-2 mb-md-0">
                            <small className="text-muted d-block">Date</small>
                            <span>
                              {moment(o?.createdAt).format("MMM DD, YYYY")}
                            </span>
                          </div>
                          <div className="col-md-2 col-6 mb-2 mb-md-0">
                            <small className="text-muted d-block">
                              Payment
                            </small>
                            {getPaymentBadge(o?.payment)}
                          </div>
                          <div className="col-md-2 col-6 mb-2 mb-md-0">
                            <small className="text-muted d-block">Items</small>
                            <strong>{o?.products?.length} Items</strong>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="p-3">
                        <h6 className="text-uppercase text-muted small fw-bold mb-3">
                          <i className="bi bi-bag me-2"></i>Order Items
                        </h6>
                        {o?.products?.map((p, i) => (
                          <div
                            className="row mb-3 p-3 rounded-3 align-items-center"
                            key={p._id}
                            style={{ background: "#f8f9fa" }}
                          >
                            <div className="col-md-2 col-4 text-center mb-2 mb-md-0">
                              <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="rounded"
                                alt={p.name}
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  objectFit: "cover",
                                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                }}
                              />
                            </div>
                            <div className="col-md-6 col-8 mb-2 mb-md-0">
                              <h5 className="fw-bold m-0">{p.name}</h5>
                              <p className="text-muted small m-0">
                                {p.description.substring(0, 80)}...
                              </p>
                              <span className="badge bg-light text-dark border mt-1">
                                {p.category?.name || "Uncategorized"}
                              </span>
                            </div>
                            <div className="col-md-4 col-12 text-md-end">
                              <div className="brand-text fw-bold fs-4">
                                ${p.price}
                              </div>
                              <small className="text-muted">
                                ETB {p.price * 120}
                              </small>
                            </div>
                          </div>
                        ))}

                        {/* Order Total */}
                        <div className="row mt-3 pt-3 border-top">
                          <div className="col-md-8"></div>
                          <div className="col-md-4">
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted">Subtotal:</span>
                              <span className="fw-bold">
                                $
                                {o?.products?.reduce(
                                  (sum, p) => sum + p.price,
                                  0
                                )}
                              </span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                              <span className="text-muted">Tax:</span>
                              <span className="fw-bold">$0.00</span>
                            </div>
                            <div className="d-flex justify-content-between pt-2 border-top">
                              <span className="fw-bold fs-5">Total:</span>
                              <span className="brand-text fw-bold fs-4">
                                $
                                {o?.products?.reduce(
                                  (sum, p) => sum + p.price,
                                  0
                                )}
                              </span>
                            </div>
                            {o?.payment?.amount && (
                              <div className="text-end mt-2">
                                <small className="text-muted">
                                  Paid: ETB {o.payment.amount}
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
