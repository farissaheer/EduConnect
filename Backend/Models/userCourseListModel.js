import mongoose from "mongoose";

const userCourseList = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
      required: true,
    },
    courses: [
      {
        orderid: {
          type: "string",
          require: true,
        },
        courseid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "coursedetails",
          required: true,
        },
        tutorid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserDetails",
          required: true,
        },
        userid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "UserDetails",
          required: true,
        },
        fees: {
          type: Number,
          required: true,
        },
        purchaseDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
  { versionKey: false }
);

const CourseListUser = mongoose.model("UserCourses", userCourseList);

export default CourseListUser;
