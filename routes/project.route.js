import express from "express";
import checkAdminKey from "../middleware/middleware.js";
import { addProject, deleteProject, getProject, updateProject } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/addProject", checkAdminKey, addProject);
router.get('/getProject', getProject);
router.patch('/updateProject/:id', checkAdminKey, updateProject);
router.delete('/deleteProject/:id', checkAdminKey, deleteProject);

export default router;
