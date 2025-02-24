import express from "express"
import cors from "cors"
import { connectDB } from "./connection/db.js";
import ProductRouter from "./Routes/productRoutes.js";
import "dotenv/config"
import userRouter from "./Routes/userRouter.js";


const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URI }))

app.use("/api", ProductRouter);
app.use("/api/user", userRouter);
connectDB();

app.listen(port, () => {
    console.log("server is started at " + port);
})


