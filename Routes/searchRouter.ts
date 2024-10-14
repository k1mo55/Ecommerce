import express from 'express'
import ratingController from '../controllers/ratingController'
import searchController from '../controllers/searchController';

const router = express.Router();


router.get('/',searchController.search)


export default router