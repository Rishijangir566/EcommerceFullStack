import mongoose from "mongoose";

const  CouponSchema = new mongoose.Schema({
    code: { type: String},
    category:{type:String},
  expiresAt: { type:Date },
})

const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;

