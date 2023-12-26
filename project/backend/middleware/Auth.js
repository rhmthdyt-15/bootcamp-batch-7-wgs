import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  jwt.verify(token, process.env.SESS_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Forbidden: Invalid or expired token" });
    }

    // Dapatkan informasi user berdasarkan decoded.email
    const user = await User.findOne({
      where: {
        email: decoded.email,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Set informasi user pada req
    req.email = decoded.email;
    req.userId = user.id;
    req.role = user.role;

    next();
  });
};

export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (user.role !== "admin" && user.role !== "super admin")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};
