import Product from "../models/productModel.js"

 export async function addToProduct(req,res){
    try{
        const newProduct =new Product (req.body) 
          await newProduct.save()
            res.status(201).send({message:"product Added"})
          }catch(error){
               res.status(500).send({message:"product not found" , Error:error.message})  
          }

}