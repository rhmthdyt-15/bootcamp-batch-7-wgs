import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const { INTEGER, STRING } = DataTypes;

const Category = db.define(
  "categories",
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama_kategori: {
      type: STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
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
    tableName: "categories",
  }
);

export default Category;
