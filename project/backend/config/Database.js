import { Sequelize } from "sequelize";

const db = new Sequelize("pos_db", "postgres", "rahmat15", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
