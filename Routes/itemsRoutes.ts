import express from 'express'
import vendorController from '../controllers/itemsController';
import { verifyToken } from '../middleware/auth';
import { VendorCheck } from '../middleware/isVendor';
import { validationItem } from '../middleware/validation'
const router = express.Router();




router.post('/insert-items',verifyToken,VendorCheck,validationItem,vendorController.insertItems)
router.get('/get-items',verifyToken,VendorCheck,vendorController.getAllItems)
router.get('/get-one-item/:itemId',vendorController.getOneItem)
router.patch('/update-item/:itemId',verifyToken,VendorCheck,validationItem,vendorController.updateItem)
export default router