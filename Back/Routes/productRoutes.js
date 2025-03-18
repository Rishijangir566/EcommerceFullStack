import express from "express";
import { addToProduct, fetchProducts, fetchCategories, addCategory ,DeleteProductOrCategory } from "../controller/product.js";
import { upload } from "../middlewares/multer.js";

const ProductRouter = express.Router();

ProductRouter.post("/add", upload.single("image"), addToProduct)
ProductRouter.get("/get", fetchProducts)
ProductRouter.get("/get/:id", fetchProducts)
ProductRouter.get("/category", fetchCategories)
ProductRouter.post("/category/add", upload.single("image"), addCategory)
ProductRouter.delete("/:id", DeleteProductOrCategory )

export default ProductRouter