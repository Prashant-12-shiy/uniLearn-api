import express from 'express';
import checkAdminKey from '../middleware/middleware.js';
import { addCatagories, getAllCatagories } from '../controllers/catagories.controller.js';

const router = express.Router();

router.post('/addCatagories', checkAdminKey, addCatagories);
router.get('/getAllCatagories', getAllCatagories);

export default router;