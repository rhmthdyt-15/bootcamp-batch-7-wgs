import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Categories from "./CategoryModel.js"; // Pastikan mengikuti penamaan file yang benar

const { UUIDV4, STRING, INTEGER } = DataTypes;

const Product = db.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode_produk: {
      type: STRING(50),
      unique: true,
      allowNull: false,
    },
    nama_produk: {
      type: STRING(255),
      allowNull: false,
    },
    kategoriId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    merk: {
      type: STRING(100),
    },
    harga_beli: {
      type: INTEGER,
    },
    diskon: {
      type: INTEGER,
      defaultValue: 0,
    },
    harga_jual: {
      type: INTEGER,
    },
    stok: {
      type: INTEGER,
      defaultValue: 0,
    },
    foto_produk_path: {
      type: STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "products", // Sesuaikan dengan nama tabel yang sebenarnya
  }
);

Categories.hasMany(Product, { foreignKey: "kategoriId", as: "kategori" });
Product.belongsTo(Categories, { foreignKey: "kategoriId", as: "kategori" });

export default Product;
