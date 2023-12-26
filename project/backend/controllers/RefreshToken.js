// Import model user dan jwt (gantilah sesuai dengan struktur folder dan nama model Anda)
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// Fungsi untuk melakukan refresh token
export const refreshToken = async (req, res) => {
  try {
    // Mendapatkan refresh token dari cookies pada request
    const refreshToken = req.cookies.refreshToken;

    // Mengirimkan respons dengan status Unauthorized jika tidak ada refresh token
    if (!refreshToken) return res.sendStatus(401);

    // Mencari pengguna berdasarkan refresh token
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken,
      },
    });

    // Mengirimkan respons dengan status Forbidden jika tidak ada pengguna dengan refresh token yang sesuai
    if (!user[0]) return res.sendStatus(403);

    // Verifikasi refresh token menggunakan secret key
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECTRET,
      (err, decoded) => {
        // Mengirimkan respons dengan status Forbidden jika verifikasi gagal
        if (err) return res.sendStatus(403);

        // Mengambil informasi pengguna dari hasil verifikasi
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const role = user[0].role;

        // Membuat access token baru dengan informasi pengguna yang diperoleh
        const accessToken = jwt.sign(
          { userId, name, email, role },
          process.env.SESS_SECRET,
          {
            expiresIn: "15s",
          }
        );

        // Mengirimkan respons dengan access token baru
        res.json({ accessToken });
      }
    );
  } catch (error) {
    // Menangani kesalahan dengan mencetaknya ke konsol
    console.log(error);
  }
};
