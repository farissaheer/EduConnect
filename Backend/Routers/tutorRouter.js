import express from "express";

import course from "../Controllers/courseController.js";
import { imageUpload, videoUpload } from "../Utils/multerConfig.js";
import student from "../Controllers/studentController.js";
import module from "../Controllers/moduleController.js";

const tutorRoute = express();

tutorRoute.use(express.json());
tutorRoute.use(express.urlencoded({ extended: false }));

tutorRoute.post("/courseAdd", imageUpload.single("image"), course.createCourse);

tutorRoute.post("/statusChange", course.statusChange);
tutorRoute.post("/editCourse", imageUpload.single("image"), course.editCourse);
tutorRoute.post("/editCourseOnly", course.editCourseOnly);

tutorRoute.post("/courseList", course.courseListTutor);
tutorRoute.post("/studentList", student.studentList);

tutorRoute.post("/moduleAdd", videoUpload.single("video"), module.createModule);

export default tutorRoute;
