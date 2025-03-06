import cartModel from "../models/cartModel.js";


export async function fetchaCart(req,res){
try{

}catch(error){
    console.log(error); 
}
   
}
export async function addToCart(req,res) {
     try{
        const {user ,items}=req.body;
        await cartModel.save();
        res.send({message:"added To Cart"})
     }catch(error){
        console.log(error);
        res.status(500).send({message:"Problem adding product to cart"})
     }
}