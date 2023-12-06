import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/CategoryController.js";

const router = express.Router();

router.get("/category", getCategory);
router.post("/category", createCategory);
router.get("/category/:id", getCategoryById);
router.patch("/category/:id", updateCategory);
router.delete("/category", deleteCategory);

export default router;
