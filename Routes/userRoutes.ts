import express  from "express";
import { validateRegister } from "../middleware/validation"; 
import userController from "../controllers/userController";
import  { verifyToken }  from '../middleware/auth'

const router = express.Router();



router.post('/register', validateRegister,userController.register);
router.post('/login',userController.login)
router.get('/personal-info',verifyToken,userController.getUser);
router.patch('/update-user',verifyToken,userController.updateUser);

export default router;