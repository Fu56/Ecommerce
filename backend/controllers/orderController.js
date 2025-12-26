import orderModel from "../models/orderModel.js";

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-image")
      .populate("buyer", "name");
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};

//all orders (Admin)
export const getAllOrdersController = async (req, res) => {
  try {
    console.log("Fetching all orders for admin...");
    const orders = await orderModel
      .find({})
      .populate("products", "name price category description")
      .populate("buyer", "name email phone")
      .sort({ createdAt: -1 });

    console.log(`Found ${orders?.length || 0} orders`);
    res.json({ success: true, orders: orders || [] });
  } catch (error) {
    console.error("Error in getAllOrdersController:", error);
    res.status(500).send({
      success: false,
      message: "Error while getting all orders",
      error: error.message,
    });
  }
};

//order status update
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order status",
      error,
    });
  }
};

//place order
export const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    const order = new orderModel({
      products: cart,
      payment: {
        status: "completed",
        method: "Manual",
        amount: 0,
      },
      buyer: req.user._id,
    }).save();
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while placing order",
      error,
    });
  }
};
