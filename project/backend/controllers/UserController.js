// Import model user (gantilah sesuai dengan struktur folder dan nama model Anda)
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

// Fungsi untuk mendapatkan semua data pengguna
export const getUsers = async (req, res) => {
  try {
    // Mengambil semua data pengguna dengan atribut tertentu
    const response = await User.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk mendapatkan data pengguna berdasarkan ID
export const getUserById = async (req, res) => {
  try {
    // Mencari pengguna berdasarkan ID dengan atribut tertentu
    const response = await User.findOne({
      attributes: ["id", "name", "email", "role"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk membuat pengguna baru
export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  // Memeriksa apakah password cocok
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });

  // Membuat salt untuk hashing password
  const salt = await bcrypt.genSalt();

  // Melakukan hash pada password
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    // Membuat pengguna baru dengan data yang diberikan
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    // Mengirimkan respons dengan status Created jika pengguna berhasil ditambahkan
    res.status(201).json({
      success: true,
      message: "User berhasil ditambahkan",
      data: newUser,
    });
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan users",
      error: error.message, // Menambahkan detail kesalahan ke respons
    });
  }
};

// Fungsi untuk memperbarui informasi pengguna
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
    hashPassword = await bcrypt.hash(password, 10);
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
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({ msg: "An error occurred while updating user" });
  }
};

// Fungsi untuk menghapus pengguna berdasarkan ID
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
    // Mengirimkan respons dengan status Bad Request jika terjadi kesalahan
    res.status(400).json({ msg: error.message });
  }
};
