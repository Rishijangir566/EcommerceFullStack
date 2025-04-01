import express from "express"
import {registerUser,loginUser,addToWishlist,checkInWishlist,getWishlist } from "../controller/user.js"
import { check } from "../middlewares/auth.js";
const userRouter =express.Router();

userRouter.post("/register" , registerUser);
userRouter.post("/login" , loginUser);
userRouter.get("/checkInWishlist/:slug" ,check, checkInWishlist);
userRouter.post("/addToWishlist" ,check, addToWishlist);
userRouter.get("/getWishlist", check, getWishlist);

export default userRouter