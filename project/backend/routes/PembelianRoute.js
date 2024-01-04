import express from "express";
import {
  createPembelian,
  destroyPembelian,
  getPembelian,
  showPembelian,
  storePembelian,
} from "../controllers/PembelianController.js";
import { adminOnly, verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/pembelian", getPembelian);
router.get("/pembelian/:id", createPembelian); // Perlu diubah ke route yang berbeda
router.post("/pembelian", storePembelian);
router.get("/pembelian-detail/:id", showPembelian); // Ganti route ke /pembelian-detail/:id
router.delete("/pembelian/:id", destroyPembelian);

export default router;
