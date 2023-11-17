import CourseListUser from "../Models/userCourseListModel.js";

const viewCourse = {
  myCourses: async (req, res) => {
    const { userid } = req.body;
    try {
      const courseList = await CourseListUser.findOne({ userid })
        .populate("courses.courseid")
        .populate("courses.tutorid");
      const { courses } = courseList;
      res.status(200).json({ status: 200, courses, message: "My Courses" });
    } catch (error) {
      console.log(error.message);
      res.status(404).json({ status: 404, message: error.message });
    }
  },

  
};

export default viewCourse;
