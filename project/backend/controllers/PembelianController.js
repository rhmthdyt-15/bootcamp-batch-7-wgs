// controllers/PembelianController.js
import Supplier from "../models/SupplierModel.js";
import Pembelian from "../models/PembelianModel.js";
import PembelianDetail from "../models/PembelianDetailModel.js";
import Product from "../models/ProductModel.js";

export const getPembelian = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({ order: [["nama", "ASC"]] });
    const pembelian = await Pembelian.findAll();

    // Pastikan bahwa id_pembelian sudah tersedia di sesi atau request
    // const id_pembelian = req.session.id_pembelian || req.params.id_pembelian;

    // Gunakan eager loading untuk mengambil detail dengan produk terkait
    const detail = await PembelianDetail.findAll({
      //   where: { id_pembelian },
      include: ["produk"], // Gantilah 'produk' dengan nama asosiasi yang benar
    });

    res.status(201).json({
      success: true,
      data: {
        suppliers,
        pembelian,
        detail,
      },
    });
  } catch (error) {
    console.error("Error in getPembelian:", error);

    // Send a more detailed error response
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
      stack: error.stack, // Include the stack trace for debugging
    });
  }
};

export const createPembelian = async (req, res) => {
  try {
    const { id } = req.params;
    const newPembelian = await Pembelian.create({
      id_supplier: id,
      total_item: 0,
      total_harga: 0,
      diskon: 0,
      bayar: 0,
    });

    req.session.id_pembelian = newPembelian.id_pembelian;
    req.session.id_supplier = newPembelian.id_supplier;

    res.status(201).json({
      success: true,
      message: "Pembelian berhasil ditambahkan",
      data: newPembelian,
    });
  } catch (error) {
    console.error("Error creating pembelian:", error);
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan pembelian",
      error: error.message,
    });
  }
};

export const storePembelian = async (req, res) => {
  const { id_pembelian, total_item, total, diskon, bayar } = req.body;
  try {
    const pembelian = await Pembelian.findByPk(id_pembelian);
    if (!pembelian) {
      return res.status(404).json({
        success: false,
        message: "Pembelian tidak ditemukan",
      });
    }

    pembelian.total_item = total_item;
    pembelian.total_harga = total;
    pembelian.diskon = diskon || 0;
    pembelian.bayar = bayar || total;
    await pembelian.save();

    const pembelianDetails = await PembelianDetail.findAll({
      where: { id_pembelian },
    });

    for (const item of pembelianDetails) {
      const product = await Product.findByPk(item.id_produk);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Produk tidak ditemukan",
        });
      }

      product.stok += item.jumlah;
      await product.save();
    }

    return res.status(200).json({
      success: true,
      message: "Pembelian berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating pembelian:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui pembelian",
      error: error.message,
    });
  }
};

export const showPembelian = async (req, res) => {
  try {
    const { id } = req.params;

    // Ambil data pembelian
    const pembelian = await Pembelian.findByPk(id, {
      include: PembelianDetail,
    });

    if (!pembelian) {
      return res.status(404).json({
        success: false,
        message: "Pembelian tidak ditemukan",
      });
    }

    // Ambil data detail pembelian dengan produk terkait
    const detail = await PembelianDetail.findAll({
      where: { id_pembelian: pembelian.id_pembelian },
    });

    res.status(200).json({
      success: true,
      data: {
        pembelian,
        detail,
      },
    });
  } catch (error) {
    console.error("Error fetching pembelian:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const destroyPembelian = async (req, res) => {
  try {
    const { id } = req.params;

    // Temukan pembelian berdasarkan id
    const pembelian = await Pembelian.findByPk(id);

    // Jika pembelian tidak ditemukan, kembalikan respons dengan status 404 (Not Found)
    if (!pembelian) {
      return res.status(404).json({
        success: false,
        message: "Pembelian tidak ditemukan",
      });
    }

    // Temukan detail pembelian berdasarkan id_pembelian
    const detail = await PembelianDetail.findAll({
      where: { id_pembelian: pembelian.id_pembelian },
    });

    // Loop melalui setiap detail pembelian
    for (const item of detail) {
      // Temukan produk berdasarkan id_produk
      const product = await Product.findByPk(item.id_produk);

      // Jika produk ditemukan, kurangi stok sesuai jumlah pada detail pembelian
      if (product) {
        product.stok -= item.jumlah;
        await product.save();
      }

      // Hapus detail pembelian
      await item.destroy();
    }

    // Hapus pembelian
    await pembelian.destroy();

    // Kembalikan respons sukses
    return res.status(200).json({
      success: true,
      message: "Pembelian berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting pembelian:", error);
    // Kembalikan respons error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
