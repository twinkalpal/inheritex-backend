import jwt, { decode } from "jsonwebtoken";
import { User } from "../model/User";
import { Request, Response } from "express";
const SECRET_KEY=process.env.SECRET_KEY || ""
export const SignToken=(user:User)=>{
    const token = jwt.sign({ id: user.id,email:user.email }, SECRET_KEY);
    return token
}

export const VerifyToken=(req:Request, res:Response,)=>{
    const token:any = req.header('Authorization')?.split(" ")[1] ;
    if (!token) return res.status(401).json({ error: 'Authtoken is missing' });
    try{
       
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
        }
    

}