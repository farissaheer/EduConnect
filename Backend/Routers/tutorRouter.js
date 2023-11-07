import express from "express";

import course from "../Controllers/courseController.js";
import { courseUpload } from "../Utils/multerConfig.js";

const tutorRoute = express();

tutorRoute.use(express.json());
tutorRoute.use(express.urlencoded({ extended: false }));

tutorRoute.post(
  "/courseAdd",
  courseUpload.single("image"),
  course.createCourse
);

export default tutorRoute;
