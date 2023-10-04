import express from "express";
import user from "../Controllers/userController.js";

const userRoute = express.Router();

userRoute.use(express.json());
userRoute.use(express.urlencoded({ extended: false }));

userRoute.post("/createAccountOTP", user.createAccountOTP);
userRoute.post("/checkOTP", user.checkOTP);
userRoute.post("/userSignUP", user.userSignup);
userRoute.post("/userLogin", user.userLogin);
userRoute.post("/resetPasswordOTP", user.resetPasswordOTP);
userRoute.post("/resetPassword", user.resetPassword);

export default userRoute;
