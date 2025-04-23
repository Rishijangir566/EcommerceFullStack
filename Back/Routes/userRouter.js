import express from "express"
import {registerUser,loginUser,addToWishlist,checkInWishlist,getWishlist ,deleteWishlist } from "../controller/user.js"
import { check } from "../middlewares/auth.js";
const userRouter =express.Router();

userRouter.post("/register" , registerUser);
userRouter.post("/login" , loginUser);
userRouter.get("/checkInWishlist/:slug" ,check, checkInWishlist);
userRouter.post("/addToWishlist" ,check, addToWishlist);
userRouter.get("/getWishlist", check, getWishlist);
userRouter.delete("/deleteWishlist/:productSlug", check, deleteWishlist);

export default userRouter