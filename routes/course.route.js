import express from "express";
import {
  addCourses,
  getAllCourse,
  getCourse,
  updateCourse,
  deleteCourse
} from "../controllers/course.controller.js";
import checkAdminKey from "../middleware/middleware.js";
const router = express.Router();

router.post("/addCourse", checkAdminKey, addCourses);
router.get("/getAllCourse", getAllCourse);
router.get("/getCourse/:id", getCourse);
router.patch('/updateCourse/:id', checkAdminKey , updateCourse);
router.delete('/deleteCourse/:id', checkAdminKey, deleteCourse);

export default router;
