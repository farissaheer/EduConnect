import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import mongoDBConnect from "./config/MongoDb.js";
import userRoute from "./Routers/userRouter.js";
import adminRoute from "./Routers/adminRouter.js";
import tutorRoute from "./Routers/tutorRouter.js";
mongoDBConnect();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/tutor", tutorRoute);

app.get("/test", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(PORT, () => {
  console.log(`server started ${PORT}`);
});
