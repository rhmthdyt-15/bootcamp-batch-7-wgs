// Import model produk dan kategori (gantilah sesuai dengan struktur folder dan nama model Anda)
import Product from "../models/ProductModel.js";
import Categories from "../models/CategoryModel.js";
import path from "path";

// Fungsi untuk mendapatkan semua data produk dengan informasi kategori
export const getProductAll = async (req, res) => {
  try {
    // Mengambil semua data produk dengan atribut tertentu dan informasi kategori
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

    // Mengirimkan respons dengan status OK dan data produk
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk mendapatkan detail produk berdasarkan ID dengan informasi kategori
export const getProductDetail = async (req, res) => {
  try {
    // Mengambil detail produk berdasarkan ID dengan atribut tertentu dan informasi kategori
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

    // Mengirimkan respons dengan status OK dan data produk
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk menambahkan produk baru
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
    // Mengambil data produk terakhir untuk mendapatkan kode_produk terakhir
    const latestProduct = await Product.findOne({
      order: [["id", "DESC"]],
    });

    // Fungsi untuk menambahkan nol di depan angka
    function tambah_nol_didepan(number, length) {
      return String(number).padStart(length, "0");
    }

    let newProductId;
    if (latestProduct) {
      newProductId = parseInt(latestProduct.kode_produk.substring(1)) + 1;
    } else {
      newProductId = 1;
    }

    // Menentukan kode_produk baru dengan menambahkan 1 ke kode_produk terakhir
    const newKodeProduk = "P" + tambah_nol_didepan(newProductId, 6);

    // Membuat produk baru dengan kode_produk yang baru dihasilkan
    const newProduct = await Product.create({
      kode_produk: newKodeProduk,
      merk,
      nama_produk,
      kategoriId,
      harga_beli,
      harga_jual,
      stok,
      foto_produk_path,
      diskon,
    });

    // Mengirimkan respons dengan status Created jika data berhasil ditambahkan
    return res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    return res.status(500).json({
      success: false,
      message: "Gagal menambahkan produk",
      error: error.message, // Menambahkan detail kesalahan ke respons
    });
  }
};

// Fungsi untuk mengupdate data produk berdasarkan ID
export const updateProduct = async (req, res) => {
  // Mencari produk berdasarkan ID
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  // Mengirimkan respons dengan status Not Found jika produk tidak ditemukan
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

// Fungsi untuk menghapus produk berdasarkan ID
export const deleteProduct = async (req, res) => {
  // Mencari produk berdasarkan ID
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  // Mengirimkan respons dengan status Not Found jika produk tidak ditemukan
  if (!product) return res.status(404).json({ msg: "Product not found" });

  try {
    // Menghapus produk
    await product.destroy({
      where: {
        id: product.id,
      },
    });

    // Mengirimkan respons dengan status OK jika produk berhasil dihapus
    res.status(200).json({ msg: "Product Deleted" });
  } catch (error) {
    // Mengirimkan respons dengan status Bad Request jika terjadi kesalahan
    res.status(400).json({ msg: error.message });
  }
};

// Fungsi untuk menghapus beberapa produk berdasarkan ID yang diberikan
export const deleteMultipleProduct = async (req, res) => {
  const { ids } = req.body;

  try {
    // Menghapus beberapa produk berdasarkan ID yang diberikan
    await Product.destroy({
      where: {
        id: ids,
      },
    });

    // Mengirimkan respons dengan status OK jika produk berhasil dihapus
    return res.status(200).json({ msg: "Products deleted" });
  } catch (error) {
    // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
    console.error("Error deleting products:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
