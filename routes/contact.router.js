import express from 'express';
import { sendMessage, getMessage,deleteMessage } from '../controllers/contact.controller.js';
import checkAdminKey from '../middleware/middleware.js';

const router = express.Router();

router.post('/sendMessage', sendMessage );
router.get('/getMessage', checkAdminKey, getMessage)
router.delete('/deleteMessage/:id', checkAdminKey, deleteMessage)

export default router;