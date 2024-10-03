import express from "express";

const mainRouter = express.Router();
import universityRouter from "./university.route.js";
import courseRouter from "./course.route.js";
import subjectRouter from "./subject.route.js";
import noteRouter from "./note.route.js";
import pastQuestionRouter from "./pastQuestion.route.js";
import projectRouter from "./project.route.js";
import semesterRouter from "./semester.route.js";
import catagoriesRouter from "./catagories.route.js";
import messageRouter from "./contact.router.js";

export default mainRouter
  .use("/", universityRouter)
  .use(courseRouter)
  .use(subjectRouter)
  .use(noteRouter)
  .use(pastQuestionRouter)
  .use(projectRouter)
  .use(catagoriesRouter)
  .use(semesterRouter)
  .use(messageRouter);
