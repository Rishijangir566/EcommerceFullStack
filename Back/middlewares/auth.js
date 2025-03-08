import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import "dotenv/config"
import Admin from "../models/adminModel.js";

// user login auth check
export async function check(req, res, next) {
    console.log("cookie", req.cookies);

    const token = req.cookies.loginToken;
    if (!token) return res.status(401).send({ message: "No Token Found" })

    // verify token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fIND the user by id 
    const user = await User.findById(decoded.id).select("userpassword");

    // user not found 
    if (!user) {
        return res.status(401).json({ message: "user not found" })
    }

    req.user = user;
    next()

}

// admin login auth check
export async function checkAdmin(req, res, next) {
    console.log("cookie", req.cookies);

    const token = req.cookies.adminToken;
    if (!token) return res.status(401).send({ message: "No Token Found" })

    // verify token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fIND the user by id 
    const admin = await Admin.findById(decoded.id).select("password");

    // user not found 
    if (!admin) {
        return res.status(401).json({ message: "admin not found" })
    }

    req.admin = admin;
    next()
}