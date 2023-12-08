import express from "express";
import {
  createMember,
  deleteMember,
  getMemberAll,
  getMemberDetail,
  updateMember,
} from "../controllers/MemberController.js";

const router = express.Router();

router.get("/member", getMemberAll);
router.post("/member", createMember);
router.get("/member/:id", getMemberDetail);
router.patch("/member/:id", updateMember);
router.delete("/member/:id", deleteMember);

export default router;
