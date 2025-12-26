import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
  placeOrderController,
} from "../controllers/orderController.js";

const router = express.Router();

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders (Admin)
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//place order
router.post("/place-order", requireSignIn, placeOrderController);

export default router;
