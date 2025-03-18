import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type:{} ,ref:"category", required:true },
    usualPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    discountPrice: { type: Number },
    description: { type: String , required:true},
    image :{type:String,required:true},

})

const Product = mongoose.model("product", productSchema)
export default Product