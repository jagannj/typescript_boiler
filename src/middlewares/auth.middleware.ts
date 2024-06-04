import {Request,Response,NextFunction} from "express"

import jwt from "jsonwebtoken";

var key = process.env.JWT_PRIVATE_KEY
export const VeriftAccesToken = (req:Request,res:Response,next:NextFunction) =>{
    let token = req?.headers?.authorization?.split(" ")[1] as string

    if(!token){
        return res
        .status(401).send({message : "No token Provided"})
    }
    jwt.verify(token,"fbndflboncxvblkclvbndflnb",async(err:any, decode:any)=>{
        if(err){
            return  res
            .status(401).send({message : "Invalid token !"})
        }
        // @ts-ignore
        req.user= decode;
        next()
    })
}

