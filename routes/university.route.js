import express from "express";
import {
  addUniversity,
  showAllUniversities,
  deleteUniversity,
  updateUniversity,
  getUniversityById,
} from "../controllers/university.controller.js";
import checkAdminKey from "../middleware/middleware.js";
const router = express.Router();

router.post("/newUniversity", checkAdminKey, addUniversity);
router.get("/getUniversity", showAllUniversities);
router.get('/getUniversity/:id', getUniversityById);
router.delete("/deleteUniversity/:id", checkAdminKey, deleteUniversity);
router.patch("/updateUniversity/:id", checkAdminKey, updateUniversity);

export default router;
