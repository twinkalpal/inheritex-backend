import { Request, Response } from "express";
const Joi = require('joi'); 
 
export const validation= (schema:any) => { 
  return (req:Request, res:Response, next:any) => { 
  const { error } = schema.validate(req.body); 
  const valid = error == null; 
  
  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map((i:any) => i.message).join(',');
   res.status(422).json({ error: message }) } 
  } 
} 
