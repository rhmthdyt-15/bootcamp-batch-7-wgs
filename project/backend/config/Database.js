import { Sequelize } from "sequelize";

const db = new Sequelize("pos_db", "postgres", "rahmat15", {
  host: "localhost",
  dialect: "postgres",
  dialectOptions: {
    timezone: "Asia/Jakarta", // Set timezone to Indonesia/Jakarta
  },
});

export default db;
