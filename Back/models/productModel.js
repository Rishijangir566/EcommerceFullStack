import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    usualPrice: { type: Number, required: true },
    discountPrice: { type: Number },
    image :{type:String,required:true},

})

const Product = mongoose.model("product", productSchema)
export default Product