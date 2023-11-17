import express from "express";

import user from "../Controllers/userController.js";
import course from "../Controllers/courseController.js";
import { imageUpload } from "../Utils/multerConfig.js";
import payment from "../Controllers/paymentController.js";
import viewCourse from "../Controllers/courseViewController.js";

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
userRoute.post("/removeCartItem", course.removeCartItem);

userRoute.post("/editProfile", imageUpload.single("image"), user.editProfile);
userRoute.post("/editProfileOnly", user.editProfileOnly);
userRoute.post("/userPaymentOrders", payment.order);
userRoute.post("/UserPaymentVerify", payment.verify);

userRoute.post("/mycourses", viewCourse.myCourses);

export default userRoute;
