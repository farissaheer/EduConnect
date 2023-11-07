import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
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
});

const Course = new mongoose.model("coursedetails", courseSchema);
export default Course;
