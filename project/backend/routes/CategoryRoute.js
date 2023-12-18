import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteMultipleCategory,
} from "../controllers/CategoryController.js";
import { adminOnly, verifyUser } from "../middleware/Auth.js";

const router = express.Router();

router.get("/category", verifyUser, adminOnly, getCategory);
router.post("/category", verifyUser, adminOnly, createCategory);
router.get("/category/:id", verifyUser, adminOnly, getCategoryById);
router.patch("/category/:id", verifyUser, adminOnly, updateCategory);
router.delete("/category/:id", verifyUser, adminOnly, deleteCategory);

router.delete("/category", verifyUser, adminOnly, deleteMultipleCategory);

export default router;
