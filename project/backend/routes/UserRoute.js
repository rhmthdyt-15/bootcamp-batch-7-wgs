import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controllers/UserController.js";
import { adminOnly, verifyToken } from "../middleware/Auth.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
