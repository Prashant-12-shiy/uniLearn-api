import express from "express";
import  { addMcq, gradeMcqs } from "../controllers/mcq.controller.js";
import checkAdminKey from "../middleware/middleware.js";

const router = express.Router();

router.post("/addMcq", checkAdminKey, addMcq);
router.post('/grade-mcqs', gradeMcqs)

export default router;