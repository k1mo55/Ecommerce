
import { Request , Response  } from "express";
import { PrismaClient, Prisma, User } from '@prisma/client'
const prisma = new PrismaClient()
const writeComments = async ( req:Request , res:Response ):Promise<any> =>{
    try{
        const { content } = req.body
        const user = await prisma.user.findUnique({
            where:{
                id:req.userId,
                isVendor:false
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
            return res.status(403).json({ message:"a vendor cant rate a product"})
        }
        const item = await prisma.items.findUnique({
            where:{
                id:req.params.itemId
            }
        })
        if(!item){
            return res.status(404).json({ message:"item can't b found" })
        }
        const comment = await prisma.comments.create({
            data:{
                content:content,
                userId:user.id,
                itemId:item.id
            }

        })
        res.status(200).json(comment)
    }catch(err){
        console.log(err)
        res.json(500).json({ message:"internal server error" })
    }

}
const updateComment = async ( req:Request , res:Response ):Promise<any> =>{
    try{
        const { content } = req.body
        const comment =await prisma.comments.update({
            where:{
                id:req.params.commentId,
                userId:req.userId
            },
            data:{
                content:content
            }
        })
        if(!comment){
            return res.status(404).json({ message:"can't update comment" })
        }
        res.status(200).json({ comment })
    }catch(err){
        res.json(500).json({ message:"internal server error" })
    }



}

const getItemComments = async ( req:Request , res:Response ):Promise<any> =>{
    try{
        let itemId=  req.params.ItemId
        const comments =await prisma.comments.findMany({
            where:{
                itemId:itemId
            },
            include:{
                user:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName:true
                    }
                }                
            }
        })
        if(!comments){
            return res.status(404).json({ message:"can't find comments" })
        }
        res.status(200).json(comments)
    }catch(err){
        res.json(500).json({ message:"internal server error" })
    }

}

const getMyComments = async ( req:Request , res:Response ):Promise<any> =>{
    try{
        let userId = req.userId
        const myComments = await prisma.comments.findMany({
            where:{
                userId:userId
            },
            include:{
                items:true
            }
        })
        if(!myComments){
            res.status(404).json({ message:"no comments" })
        }
        res.status(200).json(myComments);
    }catch(err){
        res.json(500).json({ message:"internal server error" })
    }

    
}







export default {
    writeComments,
    updateComment,
    getItemComments,
    getMyComments
}


