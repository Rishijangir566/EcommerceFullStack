import  { Schema ,model} from "mongoose";
// import mongoose from "mongoose";

const cartItemSchema = new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    attributes:{
        type:Map,
        of:String
    }
})

const cartSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    items:[cartItemSchema],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now 
    }

})

const cartModel = model ("cart" ,cartSchema)
export default cartModel