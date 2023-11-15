import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  tutorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserDetails",
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lessons: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  contents: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Course = new mongoose.model("coursedetails", courseSchema);
export default Course;
