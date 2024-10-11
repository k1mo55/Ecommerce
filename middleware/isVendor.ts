import { NextFunction,Request, Response } from "express";
import { PrismaClient, Prisma, User } from '@prisma/client'
const prisma = new PrismaClient()
export const VendorCheck = async( req:Request , res:Response , next:NextFunction):Promise<any>=>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                id:req.userId
            },
            select:{
                id:true,
                firstName:true,
                lastName:true,
                email:true,
                address:true,
                isVendor:true
            }
        })
        if(!user){
            return res.status(409).json( { message: "user not found" } )
        }
        if(user.isVendor == false){
            res.status(403).json({ message: "You do not have access to this feature." });
        }
        req.user = user
        next();

    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json( { message: "user not found" } )
              }

        }
        else{
            console.log(err)
            res.json(501).json({ meessage:"internal server error" })
        }



    }


}

