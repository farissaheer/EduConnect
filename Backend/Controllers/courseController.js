import Cart from "../Models/cartModel.js";
import Course from "../Models/courseModel.js";

const course = {
  createCourse: async (req, res) => {
    const { courseName, description, lessons, contents, fees, duration } =
      req.body;
    try {
      console.log("hello");
      const image = req.file.filename;
      const newCourse = new Course({
        courseName,
        description,
        lessons,
        contents,
        duration,
        fees,
        image,
      });
      await newCourse.save();
      res.status(200).json({
        status: 200,
        message: "Course Added",
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  },

  courseList: async (req, res) => {
    try {
      const courses = await Course.find({});
      res.status(200).json({
        status: 200,
        courses,
        message: "Course List",
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  },

  courseDetail: async (req, res) => {
    const { id } = req.body;
    try {
      const course = await Course.findById(id);
      res.status(200).json({
        status: 200,
        course,
        message: "Course List",
      });
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  },

  addtocart: async (req, res) => {
    const { courseid, userid } = req.body;
    try {
      console.log("addtocart");
      const cart = await Cart.findOne({ userid });
      if (cart) {
        const proExist = cart.courses.findIndex(
          (course) => course.courseid.toString() === courseid
        );
        if (proExist != -1) {
          return res.json({
            status: 400,
            message: "Course Already in cart",
          });
        } else {
          const course = await Course.findById(courseid);
          console.log(course);
          await Cart.findOneAndUpdate(
            { userid },
            { $push: { courses: { courseid } }, $inc: { total: course.fees } },
            { new: true }
          );
          res.status(200).json({
            status: 200,
            message: "Course Added to Cart",
          });
        }
      } else {
        const course = await Course.findById(courseid);
        const cart = new Cart({
          userid,
          courses: [{ courseid }],
          total: course.fees,
        });
        await cart.save();
        res.status(200).json({
          status: 200,
          message: "Course Added to Cart",
        });
      }
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  },

  load: async (req, res) => {
    const { userid } = req.body;
    try {
      const cartData = await Cart.findOne({ userid }).populate(
        "courses.courseid"
      );
      console.log(cartData);
      res.status(200).json({
        status: 200,
        cartData,
        message: "Cart Data",
      });
    } catch (error) {
      res.render("error", { error: error.message });
    }
  },
};

export default course;
