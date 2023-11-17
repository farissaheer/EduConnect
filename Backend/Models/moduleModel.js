import mongoose from "mongoose";

const moduleSchema = mongoose.Schema({
  tutorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDetails",
    required: true,
  },
  courseid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coursedetails",
    required: true,
  },
  moduleName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Module = new mongoose.model("moduledetails", moduleSchema);
export default Module;
