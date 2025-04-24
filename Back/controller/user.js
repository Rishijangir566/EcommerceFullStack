import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Product from "../models/productModel.js";

export async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);

    const newuser = new User({
      name,
      email,
      password: hasedPassword,
      role: "user",
    });
    await newuser.save();

    res.status(200).send({ message: "User Registered", user: newuser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "user Not Registered", Error: error.message });
  }
}
export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "Email not Found" });

    console.log(email, password, user);

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      return res.status(401).send({ message: "Invaild Credintials" });

    // create token & send it back to client as cookie

    const loginToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    console.log("loginToken", loginToken);

    res
      .cookie("loginToken", loginToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none", // strict / lax / none
        maxAge: 3600000,
      })
      .status(200)
      .json({ message: "Login Successful", user: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "user Not Registered", Error: error.message });
  }
}

export async function addToWishlist(req, res) {
  try {
    const { productSlug } = req.body;
    const { id } = req.user;

    const product = await Product.findOne({ slug: productSlug });
    if (!product) return res.status(404).send({ message: "product not Found" });

    const user = await User.findByIdAndUpdate(
      id,
      { $push: { wishlist: productSlug } },
      { new: true }
    );
    if (!user) return req.status(404).send({ message: "User not found" });
    return res.send({ message: "Product added to wishList", user });
  } catch (error) {
    return res.status(500).send({
      message: "Product not added to wishlist",
      errorString: error.message,
    });
  }
}

export async function checkInWishlist(req, res) {
  try {
    const { slug } = req.params;
    const { id } = req.user;

    const product = await Product.findOne({ slug: slug });

    const user = await User.findOne({
      _id: id,
      wishlist: { $in: slug },
    });

    // console.log("user", user);

    if (user && user._id) {
      return res.send({ exists: true });
    }
    return res.send({ exists: false });
  } catch (error) {
    return res.status(500).send({
      errorString: error.message,
    });
  }
}

export async function getWishlist(req, res) {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    // console.log(user);
    if (!user) return res.status(404).send({ message: "User not found" });

    return res.send({ wishlist: user.wishlist });
  } catch (error) {
    return res.status(500).send({ errorString: error.message });
  }
}

export async function deleteWishlist(req, res) {
  try {
    const { productSlug } = req.params;
    const { id } = req.user;

    // console.log(productSlug);
    // console.log(id);

    if (!productSlug) return res.status(400).send({ message: "No id Found" });

    const prd = await Product.find({ slug: productSlug });

    if (!prd)
      return res
        .status(404)
        .send({ message: "Product not found in the wishlist" });

    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { wishlist: productSlug } },
      { new: true }
    );
    console.log("user", user);

    if (!user) return res.status(404).send({ message: "User not found" });
    return res.send({ message: "Product removed from wishlist", user });
  } catch (error) {
    return res.status(500).send({ errorString: error.message });
  }
}
