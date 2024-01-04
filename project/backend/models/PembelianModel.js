// models/PembelianModel.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Supplier from "./SupplierModel.js";

const { INTEGER } = DataTypes;

const Pembelian = db.define(
  "pembelian",
  {
    id_pembelian: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_supplier: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: Supplier,
        key: "id",
      },
    },
    total_item: {
      type: INTEGER,
      allowNull: false,
    },
    diskon: {
      type: INTEGER,
      allowNull: true,
    },
    bayar: {
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
    tableName: "pembelian",
  }
);

export default Pembelian;
