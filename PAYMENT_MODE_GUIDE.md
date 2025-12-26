# 🔧 Chapa Payment Integration - Mock vs Real

## Current Status: MOCK MODE ✅

Your application is now using **MOCK PAYMENT MODE** for testing without a valid Chapa API key.

---

## 🎭 Mock Payment Mode (Current)

### What it does:

- ✅ Creates orders in database
- ✅ Simulates payment flow
- ✅ Shows mock checkout page
- ✅ Allows testing success/failure scenarios
- ✅ Updates order status
- ❌ No real payment processing

### How to test:

1. Add products to cart
2. Click "CHECKOUT NOW"
3. You'll see a **Mock Payment Gateway** page
4. Click "Simulate Successful Payment" or "Simulate Failed Payment"
5. View payment result

---

## 🔄 How to Switch to Real Chapa

When you get a valid Chapa API key, follow these steps:

### Step 1: Get Valid Chapa API Key

1. Go to [https://dashboard.chapa.co](https://dashboard.chapa.co)
2. Sign up or login
3. Navigate to **Settings** → **API Keys**
4. Copy your **Test Secret Key** (starts with `CHASECK_TEST-`)

### Step 2: Update Backend Controller

Replace the content of `controllers/payment.controller.js` with:

```javascript
import Chapa from "chapa";
import orderModel from "../models/orderModel.js";

const chapa = new Chapa(process.env.CHAPA_SECRET_KEY);

// Initialize payment
export const initializePaymentController = async (req, res) => {
  try {
    const { amount, email, firstName, lastName, cart } = req.body;

    // Generate unique transaction reference
    const tx_ref = `TX-${Date.now()}-${req.user._id}`;

    const paymentData = {
      amount: amount,
      currency: "ETB",
      email: email,
      first_name: firstName,
      last_name: lastName,
      tx_ref: tx_ref,
      callback_url: process.env.CHAPA_CALLBACK_URL,
      return_url: `${process.env.CLIENT_URL}/payment/success`,
      customization: {
        title: "E-commerce Payment",
        description: "Payment for products",
      },
    };

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

    // Initialize payment with Chapa
    const response = await chapa.initialize(paymentData);

    res.json({
      success: true,
      data: response.data,
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

// Verify payment
export const verifyPaymentController = async (req, res) => {
  try {
    const { tx_ref } = req.params;

    // Verify payment with Chapa
    const response = await chapa.verify(tx_ref);

    if (response.data.status === "success") {
      // Update order payment status
      await orderModel.findOneAndUpdate(
        { "payment.tx_ref": tx_ref },
        {
          "payment.status": "completed",
          "payment.method": response.data.method,
          "payment.charge": response.data.charge,
          status: "Processing",
        },
        { new: true }
      );

      res.json({
        success: true,
        message: "Payment verified successfully",
        data: response.data,
      });
    } else {
      res.json({
        success: false,
        message: "Payment verification failed",
        data: response.data,
      });
    }
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
```

### Step 3: Update .env

Update your `.env` file with the valid key:

```env
CHAPA_SECRET_KEY=CHASECK_TEST-your_actual_key_here
```

### Step 4: Restart Server

```bash
# The server will automatically restart if you're using npm run dev
# Otherwise, stop and start manually
```

---

## 📋 Comparison

| Feature            | Mock Mode      | Real Chapa          |
| ------------------ | -------------- | ------------------- |
| Order Creation     | ✅             | ✅                  |
| Payment Processing | ❌ (Simulated) | ✅ (Real)           |
| Chapa Dashboard    | ❌             | ✅                  |
| Real Money         | ❌             | ✅ (Test mode: No)  |
| Testing            | ✅ Easy        | ✅ Requires account |
| Webhooks           | ❌             | ✅                  |

---

## 🐛 Troubleshooting

### Error: "Invalid API Key"

**Solution:** You're in mock mode now, so this won't happen. When switching to real Chapa:

1. Verify your API key is correct
2. Check if your Chapa account is activated
3. Ensure you're using the TEST key for development

### Mock checkout not showing

**Solution:**

1. Check if the route is registered in `App.jsx`
2. Verify `MockCheckout.jsx` exists in pages folder
3. Clear browser cache

### Payment not completing

**Solution:**

1. Check browser console for errors
2. Verify backend is running
3. Check network tab for API responses

---

## 🎯 Current Files

### Mock Mode Files:

- ✅ `controllers/payment.controller.js` - Mock version (active)
- ✅ `controllers/payment.controller.mock.js` - Backup
- ✅ `pages/MockCheckout.jsx` - Mock payment page
- ✅ `pages/PaymentSuccess.jsx` - Success page (works with both)

### Routes:

- `/payment/mock-checkout` - Mock payment gateway
- `/payment/success` - Payment verification page

---

## 📝 Notes

1. **Mock mode is perfect for:**

   - Testing UI/UX
   - Developing features
   - Demo purposes
   - When you don't have Chapa account yet

2. **Switch to real Chapa when:**

   - You have a valid API key
   - Ready for production testing
   - Need to test actual payment flow
   - Preparing for launch

3. **The mock checkout page allows you to:**
   - Test successful payments
   - Test failed payments
   - See order creation
   - Test payment verification

---

## ✅ What Works Now

✅ Add to cart
✅ Checkout flow
✅ Order creation
✅ Mock payment page
✅ Payment success/failure simulation
✅ Order status updates
✅ Responsive UI
✅ Cart clearing after payment

---

**You can now test the entire payment flow without a valid Chapa API key!** 🎉
