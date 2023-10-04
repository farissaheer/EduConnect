import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.dbConnect, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log("Failed to Connect...", err);
  }
};

export default mongoDBConnect;
