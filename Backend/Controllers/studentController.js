import CourseListUser from "../Models/userCourseListModel.js";

const student = {
  studentList: async (req, res) => {
    const { tutorid } = req.body;
    try {
      const courseList = await CourseListUser.find({
        "courses.tutorid": tutorid,
      })
        .populate("courses.courseid")
        .populate("courses.userid");
      let courses = courseList.map((course) => course.courses);
      courses = [].concat(...courses);
      res.status(200).json({ status: 200, courses, message: "My Courses" });
    } catch (error) {
      console.log(error.message);
      res.status(404).json({ status: 404, message: error.message });
    }
  },
};

export default student;
