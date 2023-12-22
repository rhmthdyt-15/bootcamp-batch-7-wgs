import Product from "../models/ProductModel.js";
import Categories from "../models/CategoryModel.js";
import path from "path";

export const getProductAll = async (req, res) => {
  try {
    const response = await Product.findAll({
      attributes: [
        "id",
        "kode_produk",
        "nama_produk",
        "stok",
        "foto_produk_path",
        "harga_jual",
      ],
      include: [
        {
          model: Categories,
          as: "kategori",
          attributes: ["nama_kategori"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getProductDetail = async (req, res) => {
  try {
    const response = await Product.findOne({
      attributes: [
        "kode_produk",
        "nama_produk",
        "kategoriId",
        "merk",
        "harga_beli",
        "diskon",
        "stok",
        "foto_produk_path",
        "harga_jual",
      ],
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Categories,
          as: "kategori",
          attributes: ["nama_kategori"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const {
    merk,
    nama_produk,
    harga_beli,
    harga_jual,
    stok,
    diskon,
    kategoriId,
    foto_produk_path,
  } = req.body;

  try {
    const latestProduct = await Product.findOne({
      order: [["id", "DESC"]],
    });

    const newProductId = (latestProduct?.id ?? 0) + 1;
    const kodeProduk = "P" + String(newProductId).padStart(6, "0");

    const newProduct = await Product.create({
      kode_produk: kodeProduk,
      merk,
      nama_produk,
      kategoriId,
      harga_beli,
      harga_jual,
      stok,
      foto_produk_path,
      diskon,
    });

    return res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal menambahkan produk",
      error: error.message, // Menambahkan detail kesalahan ke respons
    });
  }
};

export const updateProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  // Memeriksa apakah produk ada
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  const {
    merk,
    nama_produk,
    harga_beli,
    harga_jual,
    stok,
    foto_produk_path,
    diskon,
    kategoriId,
  } = req.body;

  try {
    // Perbarui atribut produk
    await product.update({
      merk,
      nama_produk,
      harga_beli,
      harga_jual,
      stok,
      foto_produk_path,
      diskon,
      kategoriId,
    });

    // Kirim respons dengan produk yang telah diperbarui
    res.status(200).json({
      success: true,
      message: "Produk berhasil diperbarui",
      data: product,
    });
  } catch (error) {
    // Tangani kesalahan
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!product) return res.status(404).json({ msg: "Product not found" });

  try {
    // Menghapus pengguna
    await product.destroy({
      where: {
        id: product.id,
      },
    });
    res.status(200).json({ msg: "Product Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteMultipleProduct = async (req, res) => {
  const { ids } = req.body;

  try {
    await Product.destroy({
      where: {
        id: ids,
      },
    });

    return res.status(200).json({ msg: "Categories deleted" });
  } catch (error) {
    console.error("Error deleting categories:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
