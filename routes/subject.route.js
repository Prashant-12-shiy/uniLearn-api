import express from "express";
import checkAdminKey from "../middleware/middleware.js";
import { addSubject, getSubject } from "../controllers/subject.controller.js";

const router = express.Router();

router.post("/addSubject", checkAdminKey, addSubject);
router.get('/getSubject/:id', getSubject);

export default router;