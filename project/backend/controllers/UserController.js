import User from "../models/UserModel.js";
import argon2 from "argon2";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
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
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
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

  // Memeriksa apakah password cocok
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });

  // Melakukan hash pada password
  const hashPassword = await argon2.hash(password);

  try {
    // Membuat pengguna baru
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ msg: "Registration successful" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update user information
export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
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
      uuid: req.params.id,
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
