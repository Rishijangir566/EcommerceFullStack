
import express from "express"
import{addToCart, fetchaCart} from "../controller/cart.js"

const cartRouter = express.Router()

cartRouter.get("/fetchCart",fetchaCart)
cartRouter.post("/add",addToCart)

export default cartRouter;