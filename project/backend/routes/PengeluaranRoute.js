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

const router = express.Router();

router.get("/pengeluaran", getPengeluaranAll);
router.get("/pengeluaran/:id", getPengeluaranById);
router.post("/pengeluaran", createPengeluaran);
router.put("/pengeluaran/:id", updatePengeluaran);
router.delete("/pengeluaran/:id", deletePengeluaran);
router.delete("/pengeluaran", deleteMultiplePengeluaran);

export default router;
