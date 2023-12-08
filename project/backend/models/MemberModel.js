import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const Member = db.define(
  "members",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode_member: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    alamat: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    telepon: {
      type: DataTypes.STRING,
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
    tableName: "members",
  }
);

export default Member;
