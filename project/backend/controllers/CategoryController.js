import Category from "../models/CategoryModel.js";
import { Op } from "sequelize";

export const getCategory = async (req, res) => {
  try {
    const response = await Category.findAll({
      attributes: ["uuid", "nama_kategori"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const response = await Category.findOne({
      attributes: ["nama_kategori"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { nama_kategori, categories } = req.body;

  console.log("categories", categories.length);

  try {
    for (let i = 0; i < categories?.length; i++) {
      await Category.create({
        nama_kategori: categories[i].nama_kategori,
      });
    }

    // Memberikan respons setelah data berhasil ditambahkan
    return res.status(201).json({ msg: "Data berhasil ditambahkan" });
  } catch (error) {
    console.error(error);
    // Memberikan respons jika terjadi kesalahan
    return res
      .status(400)
      .json({ msg: "Terjadi kesalahan dalam menambahkan kategori" });
  }
};

export const updateCategory = async (req, res) => {
  const category = await Category.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!category) {
    return res.status(404).json({ msg: "Item not found" });
  }

  const { nama_kategori } = req.body;

  try {
    // Melakukan update pada kategori
    await category.update({
      nama_kategori: nama_kategori,
    });

    // Memberikan respons setelah data berhasil diupdate
    return res.status(200).json({ msg: "Data berhasil diupdate" });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Terjadi kesalahan dalam mengupdate kategori" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findOne({
      where: {
        uuid: id,
      },
    });

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    await category.destroy();

    return res.status(200).json({ msg: "Category deleted" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteMultipleCategory = async (req, res) => {
  const { ids } = req.body;

  try {
    await Category.destroy({
      where: {
        uuid: ids,
      },
    });

    return res.status(200).json({ msg: "Categories deleted" });
  } catch (error) {
    console.error("Error deleting categories:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
