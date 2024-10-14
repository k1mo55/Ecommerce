import { Request , Response } from 'express'
import { PrismaClient, Prisma, User } from '@prisma/client'
const prisma = new PrismaClient()

const insertRating = async(req:Request ,res:Response ):Promise<any> =>{
    try{
        const userId = req.userId
        const itemId = req.params.id
        const { number } = req.body
        const user = await prisma.user.findFirst({
            where:{
                id:userId,
                isVendor:false  //change
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
        if(!number){
            return res.status(404).json({ message:"a rating is required"})
        }
        console.log(userId)
        
        const rating = await prisma.rating.create({
            data:{
                userId:userId,
                itemId:itemId,
                number:number
            }
        })
        const stats = await prisma.rating.aggregate({
            where: {
              itemId: itemId
            },
            _avg: {
              number: true 
            }
          });
        if (stats._avg.number !== null){
            const item = await prisma.items.update({
                where:{
                    id:itemId
                },
                data:{
                    rate:stats._avg.number
                }

            })
        }
        res.status(200).json(rating)
    }catch(err){
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                res.status(409).json( { message: "can't rate more than once on the same item" } )
              }

        }
        else{
            console.log(err)
            res.json(501).json({ meessage:"internal server error" })
        }

    }
}









export default  {
    insertRating

}