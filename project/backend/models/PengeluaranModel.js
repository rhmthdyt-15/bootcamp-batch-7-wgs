import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const { INTEGER, STRING } = DataTypes;

const Pengeluaran = db.define(
  "pengeluaran",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    deskripsi: {
      type: STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nominal: {
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
    tableName: "pengeluaran",
  }
);

export default Pengeluaran;
