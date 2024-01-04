// Import model kategori (gantilah sesuai dengan struktur folder dan nama model Anda)
import { Op } from "sequelize";
import Category from "../models/CategoryModel.js";
import { getPaginatedData } from "../utils/pagination.js";

// Fungsi untuk mendapatkan semua kategori
export const getCategory = async (req, res) => {
  try {
    const response = await getPaginatedData(
      Category,
      req.query,
      ["nama_kategori"],
      Op.startsWith,
      {
        attributes: ["id", "nama_kategori"],
      }
    );

    // Mengirimkan respons dengan status OK dan data kategori
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk mendapatkan kategori berdasarkan ID
export const getCategoryById = async (req, res) => {
  try {
    // Mengambil kategori berdasarkan ID dengan atribut tertentu
    const response = await Category.findOne({
      attributes: ["nama_kategori"],
      where: {
        id: req.params.id,
      },
    });

    // Mengirimkan respons dengan status OK dan data kategori
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk menambahkan kategori baru
export const createCategory = async (req, res) => {
  const { nama_kategori, categories } = req.body;

  try {
    // Iterasi untuk menambahkan setiap kategori dari array
    for (let i = 0; i < categories?.length; i++) {
      await Category.create({
        nama_kategori: categories[i].nama_kategori,
      });
    }

    // Mengirimkan respons dengan status Created jika data berhasil ditambahkan
    return res.status(201).json({ msg: "Data berhasil ditambahkan" });
  } catch (error) {
    console.error(error);
    // Mengirimkan respons dengan status Bad Request jika terjadi kesalahan
    return res
      .status(400)
      .json({ msg: "Terjadi kesalahan dalam menambahkan kategori" });
  }
};

// Fungsi untuk mengupdate kategori berdasarkan ID
export const updateCategory = async (req, res) => {
  // Mencari kategori berdasarkan ID
  const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
  });

  // Mengirimkan respons dengan status Not Found jika kategori tidak ditemukan
  if (!category) {
    return res.status(404).json({ msg: "Item not found" });
  }

  const { nama_kategori } = req.body;

  try {
    // Melakukan update pada kategori
    await category.update({
      nama_kategori: nama_kategori,
    });

    // Mengirimkan respons dengan status OK jika data berhasil diupdate
    return res.status(200).json({ msg: "Data berhasil diupdate" });
  } catch (error) {
    // Mengirimkan respons dengan status Bad Request jika terjadi kesalahan
    return res
      .status(400)
      .json({ msg: "Terjadi kesalahan dalam mengupdate kategori" });
  }
};

// Fungsi untuk menghapus kategori berdasarkan ID
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Mencari kategori berdasarkan ID
    const category = await Category.findOne({
      where: {
        id: id,
      },
    });

    // Mengirimkan respons dengan status Not Found jika kategori tidak ditemukan
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    // Menghapus kategori
    await category.destroy();

    // Mengirimkan respons dengan status OK jika kategori berhasil dihapus
    return res.status(200).json({ msg: "Category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Fungsi untuk menghapus beberapa kategori berdasarkan ID yang diberikan
export const deleteMultipleCategory = async (req, res) => {
  const { ids } = req.body;

  try {
    // Menghapus beberapa kategori berdasarkan ID yang diberikan
    await Category.destroy({
      where: {
        id: ids,
      },
    });

    // Mengirimkan respons dengan status OK jika kategori berhasil dihapus
    return res.status(200).json({ msg: "Categories deleted" });
  } catch (error) {
    console.error("Error deleting categories:", error);
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
