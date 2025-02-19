import express from"express";

import { addToProduct } from "../controller/product.js";

const ProductRouter = express.Router() ;

ProductRouter.post("/product/add",addToProduct)
export default ProductRouter