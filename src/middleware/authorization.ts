import { Request, Response } from "express";
import { VerifyToken } from "../services/auth";
import { UserRole } from "../constants";
export const Authorization = async (req: Request, res: Response, next: any) => {
    try {
        const data= await VerifyToken(req, res)
        req.body.user=data
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
export const AdminAuth = (req: Request, res: Response, next: any) => {
    try {
        if(req.body!.user!.role!==UserRole.ADMIN){
            res.status(401).json({ error: 'You are not authorised' });
        }
        else{
            next();
        }
       
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export const UserAuth = (req: Request, res: Response, next: any) => {
    try {
       
        if(req.body.user.role!==UserRole.USER){
            res.status(401).json({ error: 'You are not authorised' });
        }
        else{
            next();
        }
       
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
