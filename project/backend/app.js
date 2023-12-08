import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRouter from "./routes/UserRoute.js";
import CategoryRouter from "./routes/CategoryRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import MemberRoute from "./routes/MemberRoute.js";
import Product from "./models/ProductModel.js";
import Member from "./models/MemberModel.js";

dotenv.config(); // Pindahkan ini ke atas konfigurasi session

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});
// (async () => {
//   await Member.sync();
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(UserRouter);
app.use(CategoryRouter);
app.use(AuthRoute);
app.use(ProductRoute);
app.use(MemberRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running");
});
