import express from "express"
import { hotDeals } from "../controller/product.js";

const dealRouter = express.Router();

dealRouter.get("/" , hotDeals)

export default dealRouter