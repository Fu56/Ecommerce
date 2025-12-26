import express from "express";
import {
  loginController,
  registerController,
  testController,
  forgetPasswordController,
} from "../controllers/auth.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import userModel from "../models/userModel.js";

//route object
const router = express.Router();
//routing
//REGISTER || METHODE POST
router.post("/register", registerController);
//LOGIN || METHODE POST
router.post("/login", loginController);
//forget password || POST
router.post("/forgot-password", forgetPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// routes/admin.js
router.get("/users", requireSignIn, isAdmin, async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).send({ success: true, users });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching users" });
  }
});

export default router;
