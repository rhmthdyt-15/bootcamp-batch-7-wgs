// Import model produk dan kategori (gantilah sesuai dengan struktur folder dan nama model Anda)
import Product from "../models/ProductModel.js";
import Categories from "../models/CategoryModel.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { getPaginatedData } from "../utils/pagination.js";
import { Op } from "sequelize";

// Fungsi untuk mendapatkan semua data produk dengan informasi kategori
export const getProductAll = async (req, res) => {
  try {
    const response = await getPaginatedData(
      Product,
      req.query,
      ["kode_produk", "nama_produk", "merk"],
      Op.startsWith,
      {
        attributes: [
          "id",
          "kode_produk",
          "nama_produk",
          "stok",
          "foto_produk_path",
          "harga_jual",
          "merk",
          "kategoriId",
        ],
        include: [
          {
            model: Categories,
            as: "kategori",
            attributes: ["nama_kategori"],
          },
        ],
      }
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getProductAll = async (req, res) => {
//   try {
//     // Mengambil semua data produk dengan atribut tertentu dan informasi kategori
//     const response = await Product.findAll({
//       attributes: [
//         "id",
//         "kode_produk",
//         "nama_produk",
//         "stok",
//         "foto_produk_path",
//         "harga_jual",
//         "merk",
//         "kategoriId",
//       ],
//       include: [
//         {
//           model: Categories,
//           as: "kategori",
//           attributes: ["nama_kategori"],
//         },
//       ],
//       order: [["createdAt", "DESC"]],
//     });

//     // Mengirimkan respons dengan status OK dan data produk
//     res.status(200).json(response);
//   } catch (error) {
//     // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
//     res.status(500).json({ msg: error.message });
//   }
// };

// Fungsi untuk mendapatkan detail produk berdasarkan ID
export const getProductDetail = async (req, res) => {
  try {
    // Cek apakah produk dengan ID tertentu ada dalam database
    const existingProduct = await Product.findByPk(req.params.id);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, msg: "Product not found with the given ID" });
    }

    // Validasi file gambar
    if (!existingProduct.foto_produk_path) {
      return res
        .status(404)
        .json({ success: false, msg: "Product image not found" });
    }

    // Mengirimkan respons dengan status OK jika data berhasil ditambahkan
    return res.status(200).json(existingProduct);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get product detail",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { merk, nama_produk, harga_beli, harga_jual, diskon, kategoriId } =
      req.body;

    if (!req.files || !req.files.foto_produk_path) {
      return res.status(400).json({ success: false, msg: "No file uploaded" });
    }

    const file = req.files.foto_produk_path;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = `${file.name.split(".")[0]}_${Date.now()}${ext}`;

    const url = `${req.protocol}://${req.get("host")}`;
    const imagePath = `/images/product/${fileName}`;
    const imageUrl = `${url}${imagePath}`;

    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res
        .status(422)
        .json({ success: false, msg: "Invalid image type", allowedTypes });
    }

    if (fileSize > 5000000) {
      return res
        .status(422)
        .json({ success: false, msg: "Image must be less than 5 MB" });
    }

    const latestProduct = await Product.findOne({
      order: [["id", "DESC"]],
    });

    // Mendapatkan id baru
    let newProductId;
    if (latestProduct) {
      newProductId = latestProduct.id + 1;
    } else {
      newProductId = 1;
    }

    // Menambahkan nol di depan angka hingga mencapai panjang tertentu (misalnya 6 digit)
    const formattedId = newProductId.toString().padStart(6, "0");

    // Menentukan kode_produk baru dengan menggunakan angka yang telah diformat
    const newKodeProduk = "P" + formattedId;

    file.mv(`./public${imagePath}`, async (err) => {
      if (err) {
        console.error("Error moving file:", err);
        return res.status(500).json({
          success: false,
          msg: "Failed to upload image",
          error: err.message,
        });
      }

      const stok = req.body.stok || 0;

      const newProductData = {
        kode_produk: newKodeProduk,
        merk,
        nama_produk,
        kategoriId,
        harga_beli,
        harga_jual,
        stok,
        foto_produk_path: imagePath,
        diskon,
      };

      const newProduct = await Product.create(newProductData);

      if (!newProduct) {
        return res.status(500).json({
          success: false,
          msg: "Failed to create product",
          error: "Failed to create product in the database",
        });
      }

      // Tambahkan imageUrl ke respons
      const responseData = {
        success: true,
        message: "Product successfully added",
        data: {
          ...newProduct.toJSON(),
          foto_produk_path: imageUrl,
        },
      };

      return res.status(201).json(responseData);
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

// Fungsi untuk menambahkan produk baru
// export const createProduct = async (req, res) => {
//   const { merk, nama_produk, harga_beli, harga_jual, diskon, kategoriId } =
//     req.body;

//   console.log(req.file);

//   try {
//     // Mengambil data produk terakhir untuk mendapatkan id terakhir
//     const latestProduct = await Product.findOne({
//       order: [["id", "DESC"]],
//     });

//     // Mendapatkan id baru
//     let newProductId;
//     if (latestProduct) {
//       newProductId = latestProduct.id + 1;
//     } else {
//       newProductId = 1;
//     }

//     // Menambahkan nol di depan angka hingga mencapai panjang tertentu (misalnya 6 digit)
//     const formattedId = newProductId.toString().padStart(6, "0");

//     // Menentukan kode_produk baru dengan menggunakan angka yang telah diformat
//     const newKodeProduk = "P" + formattedId;

//     // Menentukan stok, jika tidak ada stok yang diberikan, maka defaultnya menjadi 0
//     const stok = req.body.stok || 0;

//     // Membuat produk baru dengan kode_produk yang baru dihasilkan
//     const newProduct = await Product.create({
//       kode_produk: newKodeProduk,
//       merk,
//       nama_produk,
//       kategoriId,
//       harga_beli,
//       harga_jual,
//       stok,
//       foto_produk_path: req.file ? req.file.filename : null,
//       diskon,
//     });

//     // Mengirimkan respons dengan status Created jika data berhasil ditambahkan
//     return res.status(201).json({
//       success: true,
//       message: "Produk berhasil ditambahkan",
//       data: newProduct,
//     });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     // Mengirimkan respons dengan status Internal Server Error jika terjadi kesalahan
//     return res.status(500).json({
//       success: false,
//       message: "Gagal menambahkan produk",
//       error: error.message, // Menambahkan detail kesalahan ke respons
//     });
//   }
// };

// Fungsi untuk mengupdate data produk berdasarkan ID
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { merk, nama_produk, harga_beli, harga_jual, diskon, kategoriId } =
      req.body;

    // Cek apakah produk dengan ID tertentu ada dalam database
    const existingProduct = await Product.findByPk(productId);

    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, msg: "Product not found with the given ID" });
    }

    let imagePath = existingProduct.foto_produk_path;

    // Cek apakah ada penggantian gambar
    if (req.files && req.files.foto_produk_path) {
      // Hapus gambar lama
      try {
        fs.unlinkSync(`./public${existingProduct.foto_produk_path}`);
      } catch (err) {
        console.error("Error deleting old image:", err);
      }

      // Upload gambar baru
      const file = req.files.foto_produk_path;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = `${file.name.split(".")[0]}_${Date.now()}${ext}`;

      const url = `${req.protocol}://${req.get("host")}`;
      imagePath = `/images/product/${fileName}`;

      const allowedTypes = [".png", ".jpg", ".jpeg"];

      if (!allowedTypes.includes(ext.toLowerCase())) {
        return res
          .status(422)
          .json({ success: false, msg: "Invalid image type", allowedTypes });
      }

      if (fileSize > 5000000) {
        return res
          .status(422)
          .json({ success: false, msg: "Image must be less than 5 MB" });
      }

      file.mv(`./public${imagePath}`, (err) => {
        if (err) {
          console.error("Error moving file:", err);
          return res.status(500).json({
            success: false,
            msg: "Failed to upload image",
            error: err.message,
          });
        }
      });
    }

    const stok = req.body.stok || existingProduct.stok;

    const updatedProductData = {
      merk,
      nama_produk,
      kategoriId,
      harga_beli,
      harga_jual,
      stok,
      foto_produk_path: imagePath,
      diskon,
    };

    // Update data produk dalam database
    const updatedProduct = await existingProduct.update(updatedProductData);

    // Tambahkan imageUrl ke respons
    const responseData = {
      success: true,
      message: "Product successfully updated",
      data: {
        ...updatedProduct.toJSON(),
        foto_produk_path: `${req.protocol}://${req.get("host")}${imagePath}`,
      },
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
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
    // Menggunakan import.meta.url untuk mendapatkan URL modul
    const moduleURL = new URL(import.meta.url);

    // Menggunakan new URL untuk mengonversi menjadi path direktori
    const modulePath = path.dirname(fileURLToPath(moduleURL));

    const filePath = path.join(
      modulePath,
      `../public${product.foto_produk_path}`
    );
    fs.unlinkSync(filePath); // Menghapus file secara synchronous tanpa menggunakan callback
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

  // Validasi input
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ msg: "Invalid input" });
  }

  try {
    const moduleURL = new URL(import.meta.url);
    const modulePath = path.dirname(fileURLToPath(moduleURL));

    // Menghapus produk berdasarkan ID yang diberikan
    await Product.destroy({
      where: {
        id: ids,
      },
    });

    // Menghapus file terkait produk (misalnya: foto_produk_path)
    for (const productId of ids) {
      const product = await Product.findByPk(productId);
      if (product && product.foto_produk_path) {
        const filePath = path.join(
          modulePath,
          `../public/images/product/${product.foto_produk_path}`
        );

        // Tambahkan log untuk memeriksa nilai filePath
        console.log("Deleting file:", filePath);

        // Periksa keberadaan file sebelum menghapus
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log("File deleted successfully");
        } else {
          console.log("File not found");
        }
      }
    }

    // Mengirimkan respons dengan status OK jika produk berhasil dihapus
    return res.status(200).json({ msg: "Products deleted" });
  } catch (error) {
    console.error("Error deleting products:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
