import express from "express";
import { addNote, getNote, updateNote, deleteNote } from "../controllers/note.controller.js";
import checkAdminKey from "../middleware/middleware.js";
const router = express.Router();

router.post("/addNote", checkAdminKey, addNote);
router.get("/getNote/:id", getNote); 
router.patch("/updateNote/:id", checkAdminKey, updateNote);
router.delete("/deleteNote/:id", checkAdminKey, deleteNote);

export default router;