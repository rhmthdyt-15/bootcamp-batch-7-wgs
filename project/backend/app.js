import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import UserRouter from "./routes/UserRoute.js";
import CategoryRouter from "./routes/CategoryRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import MemberRoute from "./routes/MemberRoute.js";
import SupplierRoute from "./routes/SupplierRoute.js";
import PengeluaranRoute from "./routes/PengeluaranRoute.js";
import PembelianRoute from "./routes/PembelianRoute.js";
import Pengeluaran from "./models/PengeluaranModel.js";
import Pembelian from "./models/PembelianModel.js";
import PembelianDetail from "./models/PembelianDetailModel.js";

dotenv.config(); // Pindahkan ini ke atas konfigurasi session

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});
// (async () => {
//   await Pembelian.sync();
//   await PembelianDetail.sync();
//   // await Category.sync();
//   // await Product.sync();
//   // await Member.sync();
// })();

app.use(morgan("dev"));
app.use(express.static("public"));

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

app.use(fileUpload());
app.use(express.static("public"));
// app.use(bodyParser.text({ type: "/" }));
app.use(cookieParser());
app.use(express.json());

app.use(UserRouter);
app.use(CategoryRouter);
app.use(AuthRoute);
app.use(ProductRoute);
app.use(MemberRoute);
app.use(SupplierRoute);
app.use(PengeluaranRoute);
app.use(PembelianRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running");
});
