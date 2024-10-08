import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request , Response } from "express"

declare global{
    namespace Express{
      interface Request {
        userId:string,
      }
  
    }
  }

export const verifyToken = async ( req:Request , res:Response , next:NextFunction ): Promise<any>=>{
    try{
        let token = req.header("Authorization");
        if(!token){
            return res.status(403).send("access denied")
        }
        if( token.startsWith("Bearer ") ){
            token= token.slice(7,token.length).trimEnd()
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.userId = (decoded as JwtPayload).userId
        next();
}
    catch(err){
        res.status(500).json( { message:"you have to login" } )
    }
}


