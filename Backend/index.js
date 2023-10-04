import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoDBConnect from "./config/MongoDb.js";
import userRoute from "./Routers/userRouter.js";
import adminRoute from "./Routers/adminRouter.js";
mongoDBConnect();

const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
