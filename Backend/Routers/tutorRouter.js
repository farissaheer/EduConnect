import express from "express";

import course from "../Controllers/courseController.js";
import { imageUpload } from "../Utils/multerConfig.js";

const tutorRoute = express();

tutorRoute.use(express.json());
tutorRoute.use(express.urlencoded({ extended: false }));

tutorRoute.post("/courseAdd", imageUpload.single("image"), course.createCourse);
tutorRoute.post("/courseList", course.courseListTutor);

export default tutorRoute;
