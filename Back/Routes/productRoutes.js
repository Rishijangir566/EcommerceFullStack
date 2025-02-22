import express from "express";
import { addToProduct } from "../controller/product.js";
import { upload } from "../middlewares/multer.js";

const ProductRouter = express.Router();

ProductRouter.post("/add", upload.single("image"), addToProduct)
export default ProductRouter