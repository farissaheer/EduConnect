import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let { token } = req.body;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        next();
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
});

const blockStatus = asyncHandler(async (req, res, next) => {
  let { token } = req.body;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decoded;
      const user = await User.findById(id);
      if (!user.isBlocked) {
        next();
      } else {
        res.status(401).json({ message: "User Account blocked!!" });
      }
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
});

export { protect, blockStatus };
