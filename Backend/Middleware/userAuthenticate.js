import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let { token } = req.body;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    //   throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401).json({ message: "Invalid token" });
    // throw new Error("Not authorized, no token");
  }
});

export { protect };