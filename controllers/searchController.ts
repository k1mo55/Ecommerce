import { Request , Response } from "express"
import { PrismaClient, Prisma, User } from '@prisma/client'
const prisma = new PrismaClient()

const search = async (req:Request , res:Response ):Promise<any> =>{
    try{
        const name = req.query.name as string | undefined; 
        const minQuantity = req.query.minQuantity ? parseInt(req.query.minQuantity as string) : undefined;
        const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined;
        const minPrice = req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined;
        const maxQuantity = req.query.maxQuantity ? parseInt(req.query.maxQuantity as string) : undefined;
        let conditions:any={}
        console.log(maxPrice ,  minPrice )
        if(name){
          conditions.name = {
            contains:name,
              mode:'insensitive'
          }
        }
        if(minQuantity || maxQuantity) {
          conditions.quantity = {};
          if (minQuantity) {
            conditions.quantity.gte = minQuantity;
          }
          if (maxQuantity) {
            conditions.quantity.lte = maxQuantity;
          }
        }

        if(minPrice || maxPrice) {
          conditions.price = {};
          if (minPrice) {
            conditions.price.gte = minPrice;
          }
          if (maxPrice) {
            conditions.price.lte = maxPrice;
          }
        }
        console.log(conditions)
        const items = await prisma.items.findMany({
            where:conditions
        })

        
       if(!items.length){
        return res.status(404).json({ message:"can't find any item" })
       }
       res.status(200).json(items)

    }catch(err){
        res.status(501).json({ message:" internal server error " })
    }
}




export default {
    search
}