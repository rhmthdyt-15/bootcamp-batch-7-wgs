// models/PembelianDetailModel.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Pembelian from "./PembelianModel.js";
import Product from "./ProductModel.js"; // Import model Product

const { INTEGER } = DataTypes;

const PembelianDetail = db.define(
  "pembelian_detail",
  {
    id_pembelian_detail: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_pembelian: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: Pembelian,
        key: "id_pembelian",
      },
    },
    id_produk: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    harga_beli: {
      type: INTEGER,
      allowNull: false,
    },
    jumlah: {
      type: INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: INTEGER,
      allowNull: false,
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
    tableName: "pembelian_detail",
  }
);

PembelianDetail.belongsTo(Pembelian, {
  foreignKey: "id_pembelian",
  as: "pembelian",
});
PembelianDetail.belongsTo(Product, { foreignKey: "id_produk", as: "produk" });

export default PembelianDetail;
