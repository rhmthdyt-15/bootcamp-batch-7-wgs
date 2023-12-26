import express from "express";
import {
  createProduct,
  deleteMultipleProduct,
  deleteProduct,
  getProductAll,
  getProductDetail,
  updateProduct,
} from "../controllers/ProductController.js";
import { adminOnly, verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/product", verifyToken, adminOnly, getProductAll);
router.post("/product", verifyToken, adminOnly, createProduct);
router.get("/product/:id", verifyToken, adminOnly, getProductDetail);
router.put("/product/:id", verifyToken, adminOnly, updateProduct);
router.delete("/product/:id", verifyToken, adminOnly, deleteProduct);

router.delete("/product", verifyToken, adminOnly, deleteMultipleProduct);

export default router;
