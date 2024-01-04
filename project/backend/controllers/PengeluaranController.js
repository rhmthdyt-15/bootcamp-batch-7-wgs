// controllers/PengeluaranController.js
import { Op } from "sequelize";
import Pengeluaran from "../models/PengeluaranModel.js";
import { getPaginatedData } from "../utils/pagination.js";

// Mendapatkan semua data pengeluaran
export const getPengeluaranAll = async (req, res) => {
  try {
    const response = await getPaginatedData(
      Pengeluaran,
      req.query,
      ["deskripsi"],
      Op.startsWith
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Mendapatkan data pengeluaran berdasarkan ID
export const getPengeluaranById = async (req, res) => {
  const pengeluaranId = req.params.id;

  try {
    const pengeluaran = await Pengeluaran.findByPk(pengeluaranId);

    if (!pengeluaran) {
      return res.status(404).json({ msg: "Pengeluaran not found" });
    }

    res.status(200).json(pengeluaran);
  } catch (error) {
    console.error("Error fetching pengeluaran by ID:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Menambahkan data pengeluaran baru
export const createPengeluaran = async (req, res) => {
  const { deskripsi, nominal } = req.body;

  try {
    const newPengeluaran = await Pengeluaran.create({
      deskripsi,
      nominal,
    });

    res.status(201).json({
      success: true,
      message: "Pengeluaran berhasil ditambahkan",
      data: newPengeluaran,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menambahkan pengeluaran",
      error: error.message,
    });
  }
};

// Mengupdate data pengeluaran berdasarkan ID
export const updatePengeluaran = async (req, res) => {
  const pengeluaranId = req.params.id;

  const pengeluaran = await Pengeluaran.findByPk(pengeluaranId);

  if (!pengeluaran) {
    return res.status(404).json({ msg: "Pengeluaran not found" });
  }

  const { deskripsi, nominal } = req.body;

  try {
    await Pengeluaran.update(
      {
        deskripsi,
        nominal,
      },
      {
        where: {
          id: pengeluaranId,
        },
      }
    );

    const updatedPengeluaran = await Pengeluaran.findByPk(pengeluaranId);

    res.status(200).json({
      success: true,
      message: "Pengeluaran berhasil diperbarui",
      data: updatedPengeluaran,
    });
  } catch (error) {
    console.error("Error updating pengeluaran:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menghapus data pengeluaran berdasarkan ID
export const deletePengeluaran = async (req, res) => {
  const pengeluaranId = req.params.id;

  try {
    const pengeluaran = await Pengeluaran.findByPk(pengeluaranId);

    if (!pengeluaran) {
      return res.status(404).json({ msg: "Pengeluaran not found" });
    }

    await pengeluaran.destroy();

    res.status(200).json({
      success: true,
      message: "Pengeluaran berhasil dihapus",
      data: pengeluaran,
    });
  } catch (error) {
    console.error("Error deleting pengeluaran:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menghapus beberapa data pengeluaran berdasarkan ID yang diberikan
export const deleteMultiplePengeluaran = async (req, res) => {
  const { ids } = req.body;

  try {
    await Pengeluaran.destroy({
      where: {
        id: ids,
      },
    });

    return res.status(200).json({ msg: "Pengeluaran deleted" });
  } catch (error) {
    console.error("Error deleting pengeluaran:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
