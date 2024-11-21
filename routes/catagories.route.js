import express from 'express';
import checkAdminKey from '../middleware/middleware.js';
import { addCatagories, getAllCatagories, updateCategory , getCatagories} from '../controllers/catagories.controller.js';

const router = express.Router();

router.post('/addCatagories', checkAdminKey, addCatagories);
router.get('/getAllCatagories', getAllCatagories);
router.get('/getCategory/:id', getCatagories);
router.patch('/updateCategory/:id', checkAdminKey, updateCategory)

export default router;