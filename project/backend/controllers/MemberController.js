// Import model member (gantilah sesuai dengan struktur folder dan nama model Anda)
import { Op } from "sequelize";
import Member from "../models/MemberModel.js";
import { getPaginatedData } from "../utils/pagination.js";

// Fungsi untuk mendapatkan semua data member
export const getMemberAll = async (req, res) => {
  try {
    // Mengambil semua data member dan diurutkan berdasarkan tanggal pembuatan (createdAt) secara descending
    const response = await getPaginatedData(
      Member,
      req.query,
      ["nama", "alamat", "telepon", "kode_member"],
      Op.startsWith
    );

    // Mengirimkan respons dengan status OK dan data member
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk mendapatkan detail member berdasarkan ID
export const getMemberDetail = async (req, res) => {
  try {
    // Mengambil detail member berdasarkan ID dengan atribut tertentu
    const response = await Member.findOne({
      attributes: ["nama", "alamat", "telepon", "kode_member"],
      where: {
        id: req.params.id,
      },
    });

    // Mengirimkan respons dengan status OK dan data member
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk menambahkan member baru
export const createMember = async (req, res) => {
  const { nama, alamat, telepon } = req.body;

  try {
    // Mengambil data member terakhir untuk mendapatkan id terakhir
    const latestMember = await Member.findOne({
      order: [["id", "DESC"]],
    });

    // Mendapatkan id baru
    let newMemberId;
    if (latestMember) {
      newMemberId = latestMember.id + 1;
    } else {
      newMemberId = 1;
    }

    // Menambahkan nol di depan angka hingga mencapai panjang 5 digit
    const formattedId = newMemberId.toString().padStart(5, "0");

    // Menentukan kode_member baru dengan menggunakan angka yang telah diformat
    const newKodeMember = "M" + formattedId;

    // Membuat member baru dengan kode_member yang baru dihasilkan
    const newMember = await Member.create({
      nama,
      alamat,
      telepon,
      kode_member: newKodeMember,
    });

    // Mengirimkan respons dengan status Created jika data berhasil ditambahkan
    res.status(201).json({
      success: true,
      message: "Member berhasil ditambahkan",
      data: newMember,
    });
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan member",
      error: error.message,
    });
  }
};

// Fungsi untuk mengupdate data member berdasarkan ID
export const updateMember = async (req, res) => {
  // Mencari member berdasarkan ID
  const member = await Member.findOne({
    where: {
      id: req.params.id,
    },
  });

  // Mengirimkan respons dengan status Not Found jika member tidak ditemukan
  if (!member) {
    return res.status(404).json({ msg: "member not found" });
  }

  const { nama, alamat, telepon } = req.body;

  try {
    // Memperbarui atribut member
    await member.update({
      nama,
      alamat,
      telepon,
    });

    // Mengirimkan respons dengan status OK jika data member berhasil diupdate
    res.status(200).json({
      success: true,
      message: "Member berhasil diperbarui",
      data: member,
    });
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fungsi untuk menghapus member berdasarkan ID
export const deleteMember = async (req, res) => {
  // Mencari member berdasarkan ID
  const member = await Member.findOne({
    where: {
      id: req.params.id,
    },
  });

  // Mengirimkan respons dengan status Not Found jika member tidak ditemukan
  if (!member) return res.status(404).json({ msg: "Member not found" });

  try {
    // Menghapus member
    await member.destroy({
      where: {
        id: member.id,
      },
    });

    // Mengirimkan respons dengan status OK jika member berhasil dihapus
    res.status(200).json({ msg: "member Deleted" });
  } catch (error) {
    // Mengirimkan respons dengan status Bad Request jika terjadi kesalahan
    res.status(400).json({ msg: error.message });
  }
};

// Fungsi untuk menghapus beberapa member berdasarkan ID yang diberikan
export const deleteMultipleMember = async (req, res) => {
  const { ids } = req.body;

  try {
    // Menghapus beberapa member berdasarkan ID yang diberikan
    await Member.destroy({
      where: {
        id: ids,
      },
    });

    // Mengirimkan respons dengan status OK jika member berhasil dihapus
    return res.status(200).json({ msg: "Members deleted" });
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    console.error("Error deleting members:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
