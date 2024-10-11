import express from 'express'
import { verifyToken } from '../middleware/auth';
import commentsController from '../controllers/commentsController';

const router = express.Router();



router.post('/add-comment/:itemId',verifyToken,commentsController.writeComments)
router.put('/update-comment/:commentId',verifyToken,commentsController.updateComment)
router.get('/getItem-comments/:itemId',commentsController.getItemComments)
router.get('/getMyComments',verifyToken,commentsController.getMyComments)

export default router