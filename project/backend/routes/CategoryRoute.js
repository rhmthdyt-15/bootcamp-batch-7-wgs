import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteMultipleCategory,
} from "../controllers/CategoryController.js";
import { verifyToken } from "../middleware/Auth.js";
import { adminOnly } from "../middleware/AccessRole.js";
import { validateCategory } from "../middleware/validation/categoriValidations.js";

const router = express.Router();

router.get("/category", verifyToken, adminOnly, getCategory);
router.post("/category", verifyToken, createCategory);
router.get("/category/:id", verifyToken, getCategoryById);
router.put("/category/:id", verifyToken, updateCategory);
router.delete("/category/:id", verifyToken, deleteCategory);

router.delete("/category", verifyToken, deleteMultipleCategory);

export default router;
