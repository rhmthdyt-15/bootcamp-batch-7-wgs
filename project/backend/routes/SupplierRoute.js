import express from "express";
import {
  createSupplier,
  deleteMultipleSupplier,
  deleteSupplier,
  getAllSupplier,
  getSupplierById,
  updateSupplier,
} from "../controllers/SupplierController.js";
import { adminOnly, verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/suppliers", verifyToken, adminOnly, getAllSupplier);
router.get("/suppliers/:id", verifyToken, adminOnly, getSupplierById);
router.post("/suppliers", verifyToken, adminOnly, createSupplier);
router.put("/suppliers/:id", verifyToken, adminOnly, updateSupplier);
router.delete("/suppliers/:id", verifyToken, adminOnly, deleteSupplier);
router.delete("/suppliers", verifyToken, adminOnly, deleteMultipleSupplier);

export default router;
