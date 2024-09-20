import express from "express";
import checkAdminKey from "../middleware/middleware.js";
import {
  addPastQuestion,
  deletePastQuestion,
  getPastQuestions,
  updatePastQuestions,
} from "../controllers/pastQuestions.controller.js";

const router = express.Router();

router.post("/addPastQuestion", checkAdminKey, addPastQuestion);
router.get("/getPastQuestions", getPastQuestions);
router.patch("/updatePastQuestion/:id", checkAdminKey, updatePastQuestions);
router.delete('/deletePastQuestion/:id', checkAdminKey, deletePastQuestion);

export default router;
