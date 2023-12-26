// Import model supplier (gantilah sesuai dengan struktur folder dan nama model Anda)
import Supplier from "../models/SupplierModel.js";

// Fungsi untuk mendapatkan semua data supplier
export const getAllSupplier = async (req, res) => {
  try {
    // Mengambil semua data supplier
    const suppliers = await Supplier.findAll();

    // Mengirimkan respons dengan status Not Found jika tidak ada supplier
    if (suppliers.length === 0) {
      return res.status(404).json({ msg: "No suppliers found" });
    }

    // Mengirimkan respons dengan status OK dan data supplier
    res.status(200).json(suppliers);
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Fungsi untuk mendapatkan data supplier berdasarkan ID
export const getSupplierById = async (req, res) => {
  const supplierId = req.params.id;

  try {
    // Mencari supplier berdasarkan ID
    const supplier = await Supplier.findByPk(supplierId);

    // Mengirimkan respons dengan status Not Found jika supplier tidak ditemukan
    if (!supplier) {
      return res.status(404).json({ msg: "Supplier not found" });
    }

    // Mengirimkan respons dengan status OK dan data supplier
    res.status(200).json(supplier);
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    console.error("Error fetching supplier by ID:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Fungsi untuk menambahkan supplier baru
export const createSupplier = async (req, res) => {
  const { nama, alamat, telepon } = req.body;
  try {
    // Menambahkan supplier baru
    const newSupplier = await Supplier.create({
      nama,
      alamat,
      telepon,
    });

    // Mengirimkan respons dengan status Created jika supplier berhasil ditambahkan
    res.status(201).json({
      success: true,
      message: "Supplier berhasil ditambahkan",
      data: newSupplier,
    });
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan supplier",
      error: error.message,
    });
  }
};

// Fungsi untuk mengupdate data supplier berdasarkan ID
export const updateSupplier = async (req, res) => {
  const supplierId = req.params.id; // Gunakan req.params.id untuk mendapatkan id dari parameter URL

  // Mencari supplier berdasarkan ID
  const supplier = await Supplier.findOne({
    where: {
      id: supplierId,
    },
  });

  // Mengirimkan respons dengan status Not Found jika supplier tidak ditemukan
  if (!supplier) {
    return res.status(404).json({ msg: "Supplier not found" });
  }

  const { nama, alamat, telepon } = req.body;

  try {
    // Mengupdate atribut supplier
    await Supplier.update(
      {
        nama,
        alamat,
        telepon,
      },
      {
        where: {
          id: supplierId, // Tentukan supplier yang akan di-update berdasarkan id
        },
      }
    );

    // Mengambil data supplier yang sudah di-update
    const updatedSupplier = await Supplier.findByPk(supplierId);

    // Mengirimkan respons dengan status OK dan data supplier yang sudah di-update
    res.status(200).json({
      success: true,
      message: "Supplier berhasil diperbarui",
      data: updatedSupplier,
    });
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    console.error("Error updating supplier:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fungsi untuk menghapus supplier berdasarkan ID
export const deleteSupplier = async (req, res) => {
  const supplierId = req.params.id;

  try {
    // Mencari supplier berdasarkan ID
    const supplier = await Supplier.findByPk(supplierId);

    // Mengirimkan respons dengan status Not Found jika supplier tidak ditemukan
    if (!supplier) {
      return res.status(404).json({ msg: "Supplier not found" });
    }

    // Menghapus supplier
    await supplier.destroy();

    // Mengirimkan respons dengan status OK dan data supplier yang dihapus
    res.status(200).json({
      success: true,
      message: "Supplier berhasil dihapus",
      data: supplier,
    });
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    console.error("Error deleting supplier:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fungsi untuk menghapus beberapa supplier berdasarkan ID yang diberikan
export const deleteMultipleSupplier = async (req, res) => {
  const { ids } = req.body;

  try {
    // Menghapus beberapa supplier berdasarkan ID yang diberikan
    await Supplier.destroy({
      where: {
        id: ids,
      },
    });

    // Mengirimkan respons dengan status OK jika supplier berhasil dihapus
    return res.status(200).json({ msg: "Supplier deleted" });
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    console.error("Error deleting supplier:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
