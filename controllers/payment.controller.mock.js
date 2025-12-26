import orderModel from "../models/orderModel.js";

// Mock payment initialization (for testing without Chapa)
export const initializePaymentController = async (req, res) => {
  try {
    const { amount, email, firstName, lastName, cart } = req.body;

    // Generate unique transaction reference
    const tx_ref = `TX-${Date.now()}-${req.user._id}`;

    // Create pending order
    const order = await new orderModel({
      products: cart,
      payment: {
        status: "pending",
        tx_ref: tx_ref,
        amount: amount,
      },
      buyer: req.user._id,
      status: "Not Process",
    }).save();

    // Mock Chapa response for testing
    const mockCheckoutUrl = `${process.env.CLIENT_URL}/payment/mock-checkout?tx_ref=${tx_ref}&amount=${amount}`;

    res.json({
      success: true,
      data: {
        checkout_url: mockCheckoutUrl,
        tx_ref: tx_ref,
      },
      orderId: order._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error initializing payment",
      error: error.message,
    });
  }
};

// Mock payment verification
export const verifyPaymentController = async (req, res) => {
  try {
    const { tx_ref } = req.params;

    // Find the order
    const order = await orderModel.findOne({ "payment.tx_ref": tx_ref });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Simulate successful payment
    await orderModel.findOneAndUpdate(
      { "payment.tx_ref": tx_ref },
      {
        "payment.status": "completed",
        "payment.method": "Mock Payment",
        "payment.charge": order.payment.amount,
        status: "Processing",
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Payment verified successfully",
      data: {
        status: "success",
        tx_ref: tx_ref,
        amount: order.payment.amount,
        method: "Mock Payment",
        charge: order.payment.amount,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error verifying payment",
      error: error.message,
    });
  }
};

// Webhook/Callback handler
export const chapaWebhookController = async (req, res) => {
  try {
    const event = req.body;

    if (event.event === "charge.success") {
      const tx_ref = event.data.tx_ref;

      // Update order
      await orderModel.findOneAndUpdate(
        { "payment.tx_ref": tx_ref },
        {
          "payment.status": "completed",
          "payment.method": event.data.method,
          status: "Processing",
        }
      );
    }

    res.status(200).send("Webhook received");
  } catch (error) {
    console.log(error);
    res.status(500).send("Webhook error");
  }
};
