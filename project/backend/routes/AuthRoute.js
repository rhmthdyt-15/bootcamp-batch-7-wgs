import express from "express";
import { Login, Me, logOut } from "../controllers/Auth.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logOut);

export default router;
