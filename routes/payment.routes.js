import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  initializePaymentController,
  verifyPaymentController,
  chapaWebhookController,
} from "../controllers/payment.controller.js";

const router = express.Router();

// Initialize payment
router.post("/initialize", requireSignIn, initializePaymentController);

// Verify payment
router.get("/verify/:tx_ref", requireSignIn, verifyPaymentController);

// Webhook
router.post("/chapa/callback", chapaWebhookController);

export default router;
