import cartModel from "../models/cartModel.js";
import Product from "../models/productModel.js";

export async function fetchCart(req, res) {
  try {
    const userId = req.user._id;
    const cart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");

    if (!cart) {
      return res.status(200).json({ message: "cart is empty", items: [] });
    }
    res.status(200).send({ items: cart.items });
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

    const productToAdd = await Product.findOne({ slug: productSlug });
    if (!productToAdd) {
      return res.status(404).json({ message: "Product not found" });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productToAdd._id.toString()
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productToAdd._id, quantity });
    }
    await cart.save();

    const updateCart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");

    return res
      .status(200)
      .json({ updateCart, message: "product added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Problem adding product to cart" });
  }
}

// check in cart

export async function checkInCart(req, res) {
  try {
    const { slug } = req.params;
    const userId = req.user._id;

    //GETING PRODUCT ID FROM SLUG

    let productToFindInCart = await Product.findOne({ slug: slug });
    if (!productToFindInCart)
      return res.status(404).send({ message: "Product not found" });

    productToFindInCart = productToFindInCart.id;

    //GETTING USER'S CART
    let userCart = await cartModel.findOne({ user: userId });
    userCart = userCart.items;

    const productExists = userCart.find((cartItem) => {
      return cartItem.product.toString() === productToFindInCart._id.toString();
    });

    if (productExists)
      return res.status(400).send({ message: "Product Exists" });
    else return res.status(200).send({ message: "Product Doesn't Exists" });
  } catch (error) {
    console.log("error cheking", error);

    return res
      .status(500)
      .json({ message: "error Cheking cart", error: error.message });
  }
}

export async function updateCartQuantity(req, res) {
  try {
    const userId = req.user._id;
    const { productId, operation } = req.body;

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = new cartModel({ user: userId, items: [] });
    }
    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Product not in cart" });

    if (operation === "+") {
      item.quantity += 1;
    } else if (operation === "-") {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Remove item if quantity is 1 and user clicks "-"
        cart.items = cart.items.filter(
          (item) =>
            (item.product._id?.toString?.() || item.product.toString()) !==
            productId
        );
      }
    }

    await cart.save();
    const updatedCart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");

    res.status(200).json({ items: updatedCart.items });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating quantity" });
  }
}

export async function removeFromCart(req, res) {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    const updatedCart = await cartModel
      .findOne({ user: userId })
      .populate("items.product");

    res.status(200).json({ items: updatedCart.items });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error removing item from cart" });
  }
}
