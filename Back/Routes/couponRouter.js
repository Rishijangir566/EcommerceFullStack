// routes/coupon.js
import express from "express";
import Coupon from "../models/couponModel.js";
import User from "../models/userModel.js"; // Assuming you have a User model
// import { check } from "../middlewares/auth.js";

const couponRouter = express.Router();

// POST /api/coupon/verify
 couponRouter.post("/verify" , async (req, res) => {
  const { code } = req.body;
  console.log(code);
  

  if (!code) {
    return res.status(400).json({ message: "Coupon code is required" });
  }

  try {
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon" });
    }

    if (new Date() > new Date(coupon.expiresAt)) {
      return res.status(400).json({ message: "Coupon expired" });
    }


    res.status(200).json({ message: "Coupon applied successfully", coupon });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default couponRouter