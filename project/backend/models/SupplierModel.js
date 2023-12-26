import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const { UUIDV4, STRING, INTEGER, TEXT } = DataTypes;

const Supplier = db.define(
  "suppliers", // sesuaikan nama tabel
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama: {
      type: STRING,
      allowNull: false,
    },
    alamat: {
      type: TEXT, // Ganti dengan TEXT
      allowNull: false,
    },
    telepon: {
      type: STRING,
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
    tableName: "suppliers",
  }
);

export default Supplier;
