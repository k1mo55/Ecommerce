import { Request , Response } from "express";
import { PrismaClient, Prisma, User } from '@prisma/client'
const prisma = new PrismaClient()
const insertItems = async ( req:Request , res:Response ) :Promise<any> =>{
    try{
        const { name , description , quantity } = req.body;
        const vendorId = req.user.id
        let intquantity = parseInt(quantity)  // because validation js validate "1" same as 1 i kakee sure it is an int before inserting
        const item = await prisma.items.create({
            data:{
                name:name,
                description:description,
                quantity:intquantity,
                userId:vendorId   
            }
        })
        res.status(201).json(item);

    }catch(err){
        console.log(err)
        res.json(500).json({ message:"inteernal server error" })
    }
}

const getAllItems = async( req:Request , res:Response ):Promise<any> =>{
    try{
        const vendorId = req.user.id
        const items = await prisma.items.findMany({
            where:{
                userId : vendorId
            }
        })
        if(!items){
            return res.status(404).json({ message:"you dont have any items" })
        }
        res.status(200).json(items)

    }catch(err){
        res.status(500).json( { message:"internal serveer error" })
    }

}

const getOneItem = async( req:Request , res:Response ):Promise<any> =>{
    try{
        const itemId = req.params.itemId
        const item = await prisma.items.findUnique({
            where:{
                id:itemId
            }
        })
        if(!item){
            return res.status(404).json({ message:"item doesn't exist" })
        }
        res.status(200).json(item)
    }catch(err){
        res.status(500).json( { message:"internal serveer error" })


    }

}

const updateItem = async( req:Request , res:Response ):Promise<any> =>{
    try{
        const { name , description , quantity } = req.body;
        const itemId = req.params.itemId
        const userId = req.userId
        const item = await prisma.items.update({
            where:{
                id:itemId,
                userId:userId
            },
            data:{
                name:name,
                description:description,
                quantity:quantity
            }
        })
        res.status(200).json(item)
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2025') {
                res.status(409).json( { message: "item not found" } )
              }
        }else{
            res.json(501).json({ meessage:"internal server error" })
        }
    }
}


export default {
    insertItems,
    getAllItems,
    getOneItem,
    updateItem
}