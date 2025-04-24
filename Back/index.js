import express from "express";
import cors from "cors";
import { connectDB } from "./connection/db.js";
import ProductRouter from "./Routes/productRoutes.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRouter.js";
import authRouter from "./Routes/authRouter.js";
import dealRouter from "./Routes/dealRouter.js";
import adminRouter from "./Routes/adminRouter.js";
import cartRouter from "./Routes/cartRouter.js";

const app = express();
const port = process.env.PORT;
const corsOptions = {
  origin: process.env.FRONTEND_URI,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/product", ProductRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/deals", dealRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);
connectDB();

app.listen(port, () => {
  console.log("server is started at " + port);
});
