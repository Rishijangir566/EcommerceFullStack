
import express from "express"
import{addToCart, fetchCart} from "../controller/cart.js"
import { check } from "../middlewares/auth.js"

const cartRouter = express.Router()

cartRouter.get("/fetchCart",check ,fetchCart)
cartRouter.post("/add",check ,addToCart)

export default cartRouter;