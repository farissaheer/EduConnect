import express from "express";
import user from "../Controllers/userController.js";
import course from "../Controllers/courseController.js";

const userRoute = express.Router();

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: false }));

userRoute.post("/createAccountOTP", user.createAccountOTP);
userRoute.post("/checkOTP", user.checkOTP);
userRoute.post("/userSignUP", user.userSignup);
userRoute.post("/userLogin", user.userLogin);
userRoute.post("/resetPasswordOTP", user.resetPasswordOTP);
userRoute.post("/resetPassword", user.resetPassword);
userRoute.post("/addMoreDetails", user.addDetails);
userRoute.get("/courseList", course.courseList);
userRoute.post("/courseDetail", course.courseDetail);
userRoute.post("/addtocart", course.addtocart);
userRoute.post("/loadCart", course.load);

export default userRoute;
