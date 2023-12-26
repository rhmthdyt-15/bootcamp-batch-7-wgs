// Import model pengguna (gantilah sesuai dengan struktur folder dan nama model Anda)
import User from "../models/UserModel.js";

// Import modul untuk mengenkripsi dan mendekripsi kata sandi
import bcrypt from "bcrypt";

// Import modul untuk pembuatan dan verifikasi token
import jwt from "jsonwebtoken";

// Fungsi untuk menangani proses login pengguna
export const Login = async (req, res) => {
  try {
    // Mencari pengguna berdasarkan alamat email yang diberikan
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    });

    // Membandingkan kata sandi yang diberikan dengan kata sandi yang disimpan di database
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    // Jika kata sandi cocok, mengambil informasi pengguna untuk disertakan dalam token
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const role = user[0].role;

    // Membuat token akses dengan data pengguna yang disertakan
    const accessToken = jwt.sign(
      { userId, name, email, role },
      process.env.SESS_SECRET,
      {
        expiresIn: "30s",
      }
    );

    // Membuat token refresh dengan data pengguna yang disertakan
    const refreshToken = jwt.sign(
      { userId, name, email, role },
      process.env.REFRESH_TOKEN_SECTRET,
      {
        expiresIn: "1d",
      }
    );

    // Mengupdate token refresh pada data pengguna di database
    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    // Menyimpan token refresh dalam cookie untuk penggunaan berikutnya
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Mengirimkan token akses sebagai respon
    res.json({ accessToken });
  } catch (error) {
    // Menangani kesalahan jika alamat email tidak ditemukan
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

// Fungsi untuk menangani proses logout pengguna
export const logOut = async (req, res) => {
  // Mendapatkan token refresh dari cookie
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  // Mencari pengguna berdasarkan token refresh
  const user = await User.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  // Jika token refresh tidak valid, mengembalikan status Forbidden
  if (!user[0]) return res.sendStatus(403);

  // Mendapatkan ID pengguna
  const userId = user[0].id;

  // Mengupdate token refresh pada data pengguna di database menjadi null
  await User.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );

  // Menghapus token refresh dari cookie
  res.clearCookie("refreshToken");

  // Mengirimkan status OK sebagai respon
  return res.sendStatus(200);
};
