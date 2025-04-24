import express from "express"
import { check } from "../middlewares/auth.js";

const authRouter =express.Router();

authRouter.get("/check" , check,(req, res)=>{
    // console.log("cookies",req.cookies);
    res.send({message:"User Authntication " ,user:req.user});
});

authRouter.post("/logout",async(req,res)=>{
    try{
        res.clearCookie("loginToken",{
            httpOnly:false,
            secure:true,
            sameSite:"none"
        })
        res.status(200).send({message:"logged out"})

    }catch(error){
        return res.status(500).send({message:error.message})
    }
})

export default authRouter ;
