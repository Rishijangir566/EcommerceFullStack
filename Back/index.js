import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { connectDB } from "./connection/db.js";
import ProductRouter from "./Routes/productRoutes.js";



const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5174" }))

app.use("/api", ProductRouter)
connectDB();

app.listen(port, () => {
    console.log("server is started at " + port);
})


