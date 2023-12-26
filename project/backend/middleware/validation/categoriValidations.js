import { check } from "express-validator";
import Category from "../../models/CategoryModel.js";

export const validateCategory = [
  check("nama_kategori")
    .notEmpty()
    .withMessage("Nama kategori tidak boleh kosong")
    .custom(async (value) => {
      const existingCategori = await Category.findOne({ nama_kategori: value });
      if (existingCategori) {
        throw new Error("Nama kategori sudah digunakan");
      }
      return true;
    }),
];
