import express from "express";
import admin from "../Controllers/adminController.js";
import { protect } from "../Middleware/userAuthenticate.js";

const adminRoute = express.Router();

adminRoute.use(express.json());
adminRoute.use(express.urlencoded({ extended: false }));

adminRoute.post("/adminLogin", admin.adminLogin);
adminRoute.post("/userList", protect, admin.userList);
adminRoute.post("/blockUser", protect, admin.blockUser);
adminRoute.post("/unblockUser", protect, admin.unblockUser);

export default adminRoute;
