import bcrypt from "bcrypt";
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import "dotenv/config"



export async function registerUser(req, res) {
   try {
      const { name, email, password } = req.body;
      const hasedPassword = await bcrypt.hash(password, 10);

      const newuser = new User({ name, email, password: hasedPassword ,role:"user"})
      await newuser.save()

      res.status(200).send({ message: "User Registered", user: newuser })
   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "user Not Registered", Error: error.message })

   }

}
export async function loginUser(req, res) {
   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email })
      if (!user) return res.status(404).send({ message: "Email not Found" })

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) return res.status(401).send({ message: "Invaild Credintials" })

      // create token & send it back to client as cookie

      const loginToken = jwt.sign(
         { id: user._id, email: user.email },
         process.env.JWT_SECRET,
         {
            expiresIn: "1h",
         }
      );

      console.log("loginToken", loginToken);

      res.cookie("loginToken", loginToken, {
         httpOnly: false,
         secure: false,
         sameSite: "strict", // strict / lax / none
         maxAge: 3600000,
      }).send({ message: "Login Successful", user: user })

   } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "user Not Registered", Error: error.message })
   }

}