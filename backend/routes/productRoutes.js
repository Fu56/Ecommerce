import express from "express";
import formidable from "express-formidable";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  productCategoryController,
  relatedProductController,
  productReviewController,
} from "../controllers/productController.js";

const router = express.Router();

// Create product (with image upload via formidable)
router.post("/create-product", formidable(), createProductController);

// Get all products
router.get("/get-products", getProductController);

// Get single product by slug
router.get("/get-product/:slug", getSingleProductController);

// Get product photo
router.get("/product-photo/:pid", productPhotoController);

// Delete product
router.delete("/delete-product/:pid", deleteProductController);

// Update product
router.put("/update-product/:pid", formidable(), updateProductController);

// Filter product
router.post("/product-filters", productFiltersController);

// Product count
router.get("/product-count", productCountController);

// Product per page
router.get("/product-list/:page", productListController);

// Product by category
router.get("/product-category/:slug", productCategoryController);

// similar product
router.get("/related-product/:pid/:cid", relatedProductController);

// review product
router.put("/product-review/:pid", requireSignIn, productReviewController);

export default router;
