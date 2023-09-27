import mongoose from "mongoose";

const mongoDBConnect = async () => {
    try {
      await mongoose.connect("mongodb://0.0.0.0:27017/EDUConnect", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected...");
    } catch (err) {
      console.log("Failed to Connect...", err);
    }
  };
  
  export default mongoDBConnect;