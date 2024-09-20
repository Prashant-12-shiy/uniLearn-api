import express from 'express';
import checkAdminKey from '../middleware/middleware.js';
import { addSemester, updateSemester } from '../controllers/semester.controller.js';

const router = express.Router();

router.post('/addSemester', checkAdminKey, addSemester);
router.patch('/updateSemester/:id', checkAdminKey, updateSemester);

export default router;