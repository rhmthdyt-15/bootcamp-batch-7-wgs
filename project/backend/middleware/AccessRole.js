import Users from "../models/UserModel.js";

export const superAdminAndAdminOnly = (req, res, next) => {
  if (req.role !== "super admin" && req.role !== "admin") {
    return res.status(403).json({ msg: "Akses terlarang" });
  }
  next();
};

export const adminAndKasirOnly = (req, res, next) => {
  if (req.role !== "admin" && req.role !== "kasir") {
    return res.status(403).json({ msg: "Akses terlarang" });
  }
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ msg: "Akses terlarang" });
  }
  next();
};

export const kasirOnly = (req, res, next) => {
  if (req.role !== "kasir") {
    return res.status(403).json({ msg: "Akses terlarang" });
  }
  next();
};
