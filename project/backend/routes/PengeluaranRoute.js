// routes/PengeluaranRoutes.js
import express from "express";
import {
  createPengeluaran,
  deleteMultiplePengeluaran,
  deletePengeluaran,
  getPengeluaranAll,
  getPengeluaranById,
  updatePengeluaran,
} from "../controllers/PengeluaranController.js";
import { adminOnly, verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/pengeluaran", verifyToken, adminOnly, getPengeluaranAll);
router.get("/pengeluaran/:id", verifyToken, adminOnly, getPengeluaranById);
router.post("/pengeluaran", verifyToken, adminOnly, createPengeluaran);
router.put("/pengeluaran/:id", verifyToken, adminOnly, updatePengeluaran);
router.delete("/pengeluaran/:id", verifyToken, adminOnly, deletePengeluaran);
router.delete(
  "/pengeluaran",
  verifyToken,
  adminOnly,
  deleteMultiplePengeluaran
);

export default router;
