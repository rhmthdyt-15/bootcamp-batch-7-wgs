import express from "express";
import { Login, logOut } from "../controllers/Auth.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logOut);

export default router;
