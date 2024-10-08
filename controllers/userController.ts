import { Request , Response } from "express"
import bcrypt from "bcrypt"
import { PrismaClient, Prisma, User } from '@prisma/client'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()


 const register = async ( req:Request , res:Response  )=>{
    try{
        const { firstName , lastName , email , password , address} = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password , salt ) 
    
        

         const user  =await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password: hashedPassword,
                address 
            },
            select:{
                firstName:true,
                lastName:true,
                email:true,
                address:true 
            }
         })
         await prisma.$disconnect()
         res.status(201).json( {user} )
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                res.status(409).json( { message: "email used before" } )
              }

        }else{
            res.json(501).json({ meessage:"internal server error" })
        }
    }
}

 const login = async ( req:Request , res:Response ) :Promise<any> =>{
    try{
        const { email , password } = req.body
        const user = await prisma.user.findUnique({
            where: {
              email:email,
            },
          })
          if(!user){
             return res.status(404).json( { message:"wrong credntials" } )
             
          }
          const isPasswordValid = await bcrypt.compare(password, user.password)
          if(!isPasswordValid){
            return res.status(404).json( { message:"wrong credntials" } ) 
          }
          const { password:userpassword , ...info } = user

          const token  = jwt.sign(
            { userId:user.id },
            process.env.JWT_SECRET_KEY as string,
            {expiresIn:"1d"}

          )

          
          res.status(200).json({
            info,
            token
          })
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                res.status(409).json( { message: "email used before" } )
              }

        }else{
            console.log(err)
            res.json(501).json({ meessage:"internal server error" })
        }
    }



}

const getUser = async ( req:Request , res:Response ):Promise<any> =>{
    try{
        const userId = req.userId;
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                firstName:true,
                lastName:true,
                address:true,
                email:true
            }
        })
        if(!user){
            return res.status(404).json({ message:"please login"})
        }
        res.status(200).json(user);
    }catch(err){
        console.log(err)
        res.json(501).json({ meessage:"internal server error" })
    }
}

const updateUser = async ( req:Request , res:Response ):Promise<any> =>{
    try{
        const { firstName , lastName , email  , address } = req.body
        const user = await prisma.user.update({
            where:{
                id:req.userId
            },
            data:{
                firstName:firstName,
                lastName:lastName,
                email:email,
                address:address
            },
            select:{
                firstName:true,
                lastName:true,
                address:true,
                email:true
            }
        })
        res.status(200).json(user)
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                return res.status(409).json( { message: "user not found" } )
              }
            else if (err.code === 'P2002') {
                res.status(409).json( { message: "email used before" } )
              }

        }
        else{
            console.log(err)
            res.json(501).json({ meessage:"internal server error" })
        }
    }


}




export default {
    register,
    login,
    getUser,
    updateUser

}



