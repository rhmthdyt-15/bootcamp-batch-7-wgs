import Member from "../models/MemberModel.js";

export const getMemberAll = async (req, res) => {
  try {
    const response = await Member.findAll({
      attributes: ["nama", "alamat", "telepon"],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getMemberDetail = async (req, res) => {
  try {
    const response = await Member.findOne({
      attributes: ["nama", "alamat", "telepon", "kode_member"],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createMember = async (req, res) => {
  const { nama, alamat, telepon } = req.body;

  try {
    // Mengambil data member terakhir untuk mendapatkan kode_member terakhir
    const latestMember = await Member.findOne({
      order: [["id", "DESC"]],
    });

    // Fungsi untuk menambahkan nol di depan angka
    function tambah_nol_didepan(number, length) {
      return String(number).padStart(length, "0");
    }

    let newMemberId;
    if (latestMember) {
      newMemberId = parseInt(latestMember.kode_member.substring(1)) + 1;
    } else {
      newMemberId = 1;
    }

    // Menentukan kode_member baru dengan menambahkan 1 ke kode_member terakhir
    const newKodeMember = "M" + tambah_nol_didepan(newMemberId, 5);

    // Membuat member baru dengan kode_member yang baru dihasilkan
    const newMember = await Member.create({
      nama,
      alamat,
      telepon,
      kode_member: newKodeMember,
    });

    res.status(201).json({
      success: true,
      message: "Member berhasil ditambahkan",
      data: newMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan member",
      error: error.message,
    });
  }
};

export const updateMember = async (req, res) => {
  const member = await Member.findOne({
    where: {
      id: req.params.id,
    },
  });

  // Memeriksa apakah produk ada
  if (!member) {
    return res.status(404).json({ msg: "member not found" });
  }

  const { nama, alamat, telepon } = req.body;

  try {
    // Perbarui atribut produk
    await member.update({
      nama,
      alamat,
      telepon,
    });

    // Kirim respons dengan produk yang telah diperbarui
    res.status(200).json({
      success: true,
      message: "Mroduk berhasil diperbarui",
      data: member,
    });
  } catch (error) {
    // Tangani kesalahan
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMember = async (req, res) => {
  const member = await Member.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!member) return res.status(404).json({ msg: "Member not found" });

  try {
    // Menghapus pengguna
    await member.destroy({
      where: {
        id: member.id,
      },
    });
    res.status(200).json({ msg: "member Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
