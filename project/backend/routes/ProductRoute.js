import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductAll,
  getProductDetail,
  updateProduct,
} from "../controllers/ProductController.js";
import { adminOnly, verifyUser } from "../middleware/Auth.js";

const router = express.Router();

router.get("/product", verifyUser, adminOnly, getProductAll);
router.post("/product", verifyUser, adminOnly, createProduct);
router.get("/product/:id", verifyUser, adminOnly, getProductDetail);
router.patch("/product/:id", verifyUser, adminOnly, updateProduct);
router.delete("/product/:id", verifyUser, adminOnly, deleteProduct);

export default router;
