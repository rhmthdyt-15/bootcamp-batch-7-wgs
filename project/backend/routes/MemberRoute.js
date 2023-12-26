import express from "express";
import {
  createMember,
  deleteMember,
  deleteMultipleMember,
  getMemberAll,
  getMemberDetail,
  updateMember,
} from "../controllers/MemberController.js";
import { verifyToken } from "../middleware/Auth.js";
import { adminOnly } from "../middleware/AccessRole.js";

const router = express.Router();

router.get("/member", verifyToken, getMemberAll);
router.post("/member", verifyToken, createMember);
router.get("/member/:id", verifyToken, getMemberDetail);
router.put("/member/:id", verifyToken, updateMember);
router.delete("/member/:id", verifyToken, deleteMember);
router.delete("/member", verifyToken, deleteMultipleMember);

export default router;
