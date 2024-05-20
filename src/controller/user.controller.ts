import { Request, Response } from "express";
import { User } from "../model/User";
import { myDataSource } from "../../app-data-source";
import { hashPassword, matchPassword } from "../services/password";
import { SignToken } from "../services/auth";
 const createUser = async (req:Request, res:Response)=>{
    console.log(req)
    try {
        const {firstName,lastName,mobile,password,email}=req.body
       
        const userRepo=myDataSource.getRepository(User)
        const userData=await userRepo.findOne({where:{email:email}})
        if(userData){
            return res.status(400).json({
               
                status: 400,
                success: false,
                message: "User already exist"
            });
        }
        const user = new User();
        user.lastName = lastName;
        user.firstName =firstName;
        user.email =email.toLowerCase();
        user.mobile=mobile
        const hashedPassword= await hashPassword(password)
        user.password=hashedPassword
        await userRepo.save(user);
        console.log(user,"=>user")
        return res.status(201).json({
            status: 201,
            success: true,
            message:"User Created successfully"
        });
    }catch (e) {
        console.log(e)
        return res.status(500).json({
            status: 500,
            success: false,
            message: e
            
        });
    }
}


const Login = async (req:Request, res:Response)=>{
    try {
        const {email}=req.body
        const user = new User();
        const userRepo=myDataSource.getRepository(User)
        const userData=await userRepo.findOne({where:{email:email.toLowerCase()}})
        if(!userData){
            return res.status(400).json({
                status: 400,
                success: false,
                message: "User not exist with this email"
            });
        }
        const passwordMatched=await matchPassword(req.body.password,userData?.password)
        if(!passwordMatched){
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Password is wrong"
            });
        }
        const access_token=SignToken(userData)
        let options:any = {
            maxAge: 20 * 60 * 1000, // would expire in 20minutes
            httpOnly: true, // The cookie is only accessible by the web server
            secure: true,
            sameSite: "None",
        };
        res.cookie("SessionID", access_token, options);
        const {password, ...data}=userData
        return res.status(200).json({
            status: 200,
            success: true,
            data:data,
            access_token:access_token,
            message:"User Loggedin successfully"
        });
    }catch (e) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: e
            
        });
    }
}
const getUserList = async (req:Request, res:Response)=>{
    try {       
        const userRepo=myDataSource.getRepository(User)
        const result=await userRepo.find();

        return res.status(200).json({
            status: 200,
            result
        });
    }catch (e) {
        return res.status(500).json({
            message: e
        });
    }
}
export { createUser,getUserList,Login }