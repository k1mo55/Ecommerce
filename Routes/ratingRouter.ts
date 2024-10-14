import express from 'express'
import ratingController from '../controllers/ratingController'
import { verifyToken } from '../middleware/auth'



const router = express.Router()





router.post('/insert-rating/:id',verifyToken,ratingController.insertRating)




export default router