import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Admin from "../models/adminModel.js";
import "dotenv/config"
import categoryModel from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";


export async function loginAdmin(req, res) {
    try {
       const { email, password } = req.body;
 
       const admin = await Admin.findOne({ email })
       if (!admin) return res.status(404).send({ message: "Email not Found" })
 
       const passwordMatches = await bcrypt.compare(password, admin.password);
       if (!passwordMatches) return res.status(401).send({ message: "Invaild Credintials" })
 
       // create token & send it back to client as cookie
 
       const adminToken = jwt.sign(
          { id: admin._id, email: admin.email },
          process.env.JWT_SECRET,
          {
             expiresIn: "1h",
          }
       );
 
      //  console.log("adminToken", adminToken);
 
       res.cookie("adminToken", adminToken, {
          httpOnly: false,
          secure: true,
          sameSite: "none", // strict / lax / none
          maxAge: 3600000,
       }).send({ message: "Admin Login Successful", admin: admin })
 
    } catch (error) {
       console.log(error);
       return res.status(500).send({ message: "user Not login", Error: error.message })
    }
 
 }

 export async function count(req, res) {
   const count = { categories: 0, orders: 0, products: 0, users: 0 };
   try {
     count.categories = await categoryModel.countDocuments();
     // const orderCount = await Order.countDocuments();
     count.products = await Product.countDocuments();
     count.users = await User.countDocuments();
 
     return res.send({count});
   } catch (error) {
     return res
       .status(500)
       .send({ message: "Unable to count numbers", errorString: error.message });
   }
 }