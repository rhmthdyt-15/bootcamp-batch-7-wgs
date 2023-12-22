import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["id", "name", "email", "role"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  // const userLogin = await User.findOne({
  //   where: {
  //    id: req.session.userId,
  //   },
  // });

  // let role = "super admin";

  // if (userLogin.dataValues.role === "super admin") {
  //   role = "admin";
  // } else if (userLogin.dataValues.role === "admin") {
  //   role = "kasir";
  // }

  // Memeriksa apakah password cocok
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });

  const salt = await bcrypt.genSalt();
  // Melakukan hash pada password
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    // Membuat pengguna baru
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    return res.status(201).json({
      success: true,
      message: "User berhasil ditambahkan",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal menambahkan users",
      error: error.message, // Menambahkan detail kesalahan ke respons
    });
  }
};

// Update user information
export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  // Memeriksa apakah pengguna ada
  if (!user) {
    res.status(404).json({ msg: "User not found" });
  }

  const { name, email, password, confPassword, role } = req.body;
  let hashPassword;

  // Memeriksa apakah password diberikan
  if (password === "" || password === null || password === undefined) {
    hashPassword = user.password;
  } else {
    // Melakukan hash pada password baru
    hashPassword = await argon2.hash(password);
  }

  // Memeriksa apakah password cocok
  if (password !== confPassword) {
    res.status(400).json({ msg: "Password and confirm do not match" });
  }

  try {
    // Memperbarui informasi pengguna
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(201).json({ msg: "Update successful" });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred while updating user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  // Memeriksa apakah pengguna ada
  if (!user) return res.status(404).json({ msg: "User not found" });

  try {
    // Menghapus pengguna
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
