import cartModel from "../models/cartModel.js";


export async function fetchCart(req, res) {
    try {
        const userId = req.user._id
        const cart = await cartModel.findOne({ user: userId }).populate("item.product")

        if (!cart) {
            return res.status(200).json({ message: "cart is empty", items: [] })
        }
        res.status(200).json(cart)

    } catch (error) {
        console.log(error);
    }

}
export async function addToCart(req, res) {
    try {
        const userId = req.User._id;
        const {product, quantity,user,items } = req.body;

        let cart = await cartModel.findOne({ user: userId })

        if (!cart) {
            cart = new cartModel({ user: userId, items: [] })
        }

        const exitingItem = cart.items.find(item => item.product.toString() === product)

        if (exitingItem) {
            exitingItem.quantity += quantity;
        }
        else {
            cart.items.push({ product, quantity })
        }
        await cart.save();
        const updateCart = await cartModel.findOne({ user: userId }).populate("items.product")
        res.status(200).json(updateCart)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Problem adding product to cart" })
    }
}