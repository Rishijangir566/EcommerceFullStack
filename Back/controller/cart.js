import cartModel from "../models/cartModel.js";
import Product from "../models/productModel.js";

export async function fetchCart(req, res) {
  try {
    const userId = req.user._id;
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("item.product");

    if (!cart) {
      return res.status(200).json({ message: "cart is empty", items: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
}
export async function addToCart(req, res) {
  try {
    const userId = req.user._id;
    const { productSlug, quantity = 1 } = req.body;

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({ user: userId, items: [] });
    }

    const exitingItem = cart.items.find(
      (item) => item.product === productSlug
    );

    if (exitingItem) {
      exitingItem.quantity += quantity;
    } else {
        const productToAdd=await Product.findOne({slug:productSlug})
      cart.items.push({ product:productToAdd._id, quantity:quantity });
    }
    await cart.save();

    const updateCart = await cartModel.findOne({ user: userId }).populate("items.product")
     return res.status(200).json({updateCart , message:"product added success"})
    
  } catch (error) {
    console.log(error);
     return res.status(500).send({ message: "Problem adding product to cart" });
  }
}


// check in cart

export async function checkInCart(req,res){
    try {
        const {slug}=req.params
        const userId=req.user._id;

        //GETING PRODUCT ID FROM SLUG

    let productToFindInCart = await Product.findOne({ slug: slug });
    productToFindInCart = productToFindInCart.id;

    //GETTING USER'S CART
    let userCart = await cartModel.findOne({ user: userId });
    userCart = userCart.items;

    const productExists = userCart.find((cartItem) => {
        return cartItem.product.toString() === productToFindInCart;
      });

      if (productExists)
        return res.status(400).send({ message: "Product Exists" });
      else return res.status(200).send({ message: "Product Doesn't Exists" });
        
    }catch(error){
        console.log("error cheking" ,error);
        
        return res.status(500).json({message:"error Cheking cart" , error:error.message})
        
    }

}
