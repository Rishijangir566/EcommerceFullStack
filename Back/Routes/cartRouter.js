
import express from "express"
import{addToCart, fetchCart,checkInCart, updateCartQuantity, removeFromCart} from "../controller/cart.js"
import { check } from "../middlewares/auth.js"

const cartRouter = express.Router()

cartRouter.get("/fetchCart",check ,fetchCart)
cartRouter.post("/add",check ,addToCart)
cartRouter.get("/checkInCart/:slug",check ,checkInCart)
cartRouter.put("/updateQuantity" ,check,updateCartQuantity)
cartRouter.delete("/removeProduct/:productId", check, removeFromCart)

export default cartRouter;