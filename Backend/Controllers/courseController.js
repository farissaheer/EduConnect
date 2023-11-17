import Cart from "../Models/cartModel.js";
import Course from "../Models/courseModel.js";

const course = {
  createCourse: async (req, res) => {
    const {
      courseName,
      description,
      tutorid,
      lessons,
      contents,
      fees,
      duration,
    } = req.body;
    try {
      const image = req.file.filename;
      const newCourse = new Course({
        tutorid,
        courseName,
        description,
        lessons,
        contents,
        duration,
        fees,
        image,
      });
      await newCourse.save();
      res.status(200).json({ status: 200, message: "Course Added" });
    } catch (error) {
      res.status(404).json({ status: 404, message: error.message });
    }
  },

  statusChange: async (req, res) => {
    const { courseid } = req.body;
    try {
      const course = await Course.findById(courseid);
      const status = course.status ? false : true;
      const courseData = await Course.findByIdAndUpdate(courseid, {
        $set: { status },
      });
      const message = courseData.status
        ? "Course Deactivated Successfully"
        : "Course Activated Successfully";
      if (courseData) {
        return res.status(200).json({
          status: 200,
          message,
        });
      } else {
        return res.status(404).json({
          status: 404,
          message: "Something went wrong",
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  editCourseOnly: async (req, res) => {
    const {
      courseid,
      courseName,
      description,
      lessons,
      contents,
      duration,
      fees,
    } = req.body;
    try {
      await Course.findByIdAndUpdate(courseid, {
        $set: { courseName, description, lessons, contents, duration, fees },
      });
      return res.json({ status: 200, message: "Course Details Updated" });
    } catch (error) {
      return res.json({ status: 500, message: "Internal server error" });
    }
  },

  editCourse: async (req, res) => {
    const {
      courseid,
      courseName,
      description,
      lessons,
      contents,
      duration,
      fees,
    } = req.body;
    try {
      const image = req.file.filename;
      await Course.findByIdAndUpdate(courseid, {
        $set: {
          courseName,
          description,
          lessons,
          contents,
          duration,
          fees,
          image,
        },
      });
      return res.json({ status: 200, message: "Course Details Updated" });
    } catch (error) {
      return res.json({ status: 500, message: "Internal server error" });
    }
  },

  courseList: async (req, res) => {
    try {
      const courses = await Course.find({});
      res.status(200).json({ status: 200, courses, message: "Course List" });
    } catch (error) {
      res.status(404).json({ status: 404, message: error.message });
    }
  },

  courseDetail: async (req, res) => {
    const { id } = req.body;
    try {
      const course = await Course.findById(id);
      res.status(200).json({ status: 200, course, message: "Course List" });
    } catch (error) {
      res.status(404).json({ status: 404, message: error.message });
    }
  },

  courseListTutor: async (req, res) => {
    const { tutorid } = req.body;
    try {
      const courses = await Course.find({ tutorid });
      res.status(200).json({ status: 200, courses, message: "Course List" });
    } catch (error) {
      res.status(404).json({ status: 404, message: error.message });
    }
  },

  addtocart: async (req, res) => {
    const { courseid, userid } = req.body;
    try {
      const cart = await Cart.findOne({ userid });
      if (cart) {
        const proExist = cart.courses.findIndex(
          (course) => course.courseid.toString() === courseid
        );
        if (proExist != -1) {
          return res.json({ status: 400, message: "Course Already in cart" });
        } else {
          await Cart.findOneAndUpdate(
            { userid },
            { $push: { courses: { courseid } } },
            { new: true }
          );
          res
            .status(200)
            .json({ status: 200, message: "Course Added to Cart" });
        }
      } else {
        const cart = new Cart({ userid, courses: [{ courseid }] });
        await cart.save();
        res.status(200).json({ status: 200, message: "Course Added to Cart" });
      }
    } catch (error) {
      res.status(404).json({ status: 404, message: error.message });
    }
  },

  removeCartItem: async (req, res) => {
    const { courseid, userid } = req.body;
    try {
      await Cart.findOneAndUpdate(
        { userid },
        { $pull: { courses: { courseid } } }
      );
      const cartData = await Cart.findOne({ userid }).populate(
        "courses.courseid"
      );
      res.status(200).json({ status: 200, cartData, message: "Item removed" });
    } catch (error) {
      console.log(error.message);
      res.status(404).json({ status: 404, message: error.message });
    }
  },

  load: async (req, res) => {
    const { userid } = req.body;
    try {
      const cartData = await Cart.findOne({ userid }).populate(
        "courses.courseid"
      );
      res.status(200).json({ status: 200, cartData, message: "Cart Data" });
    } catch (error) {
      res.status(404).json({ status: 404, message: error.message });
    }
  },
};

export default course;
