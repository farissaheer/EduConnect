import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
import crypto from "crypto";

import Cart from "../Models/cartModel.js";
import CourseListUser from "../Models/userCourseListModel.js";
import generateUniqueID from "../Utils/generateUniqueID.js";

const payment = {
  order: async (req, res) => {
    try {
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_ID_KEY,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
      });

      const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };

      instance.orders.create(options, (error, order) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Something Went Wrong!" });
        }
        res.status(200).json({ data: order });
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
      console.log(error);
    }
  },

  verify: async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body.response;
      const { userid } = req.body;

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
        .update(sign.toString())
        .digest("hex");
      if (razorpay_signature === expectedSign) {
        console.log("sucess");
        const cartDetails = await Cart.findOne({ userid }).populate(
          "courses.courseid"
        );

        if (cartDetails) {
          const uniqueID = generateUniqueID();
          const courses = [];

          if (cartDetails.courses.length > 0) {
            cartDetails.courses.forEach((course) => {
              courses.push({
                orderid: uniqueID,
                courseid: course.courseid._id,
                tutorid: course.courseid.tutorid,
                userid,
                fees: course.courseid.fees,
              });
            });
          }

          const courseList = await CourseListUser.find({ userid });
          if (courseList.length) {
            await CourseListUser.updateOne(
              { userid },
              { $push: { courses: { $each: courses } } }
            );
          } else {
            const newCourseList = new CourseListUser({ userid, courses });
            try {
              await newCourseList.save();
              console.log("Saved order");
            } catch (error) {
              console.error("Error saving order:", error);
            }
          }

          const deletedUser = await Cart.findOneAndDelete({ userid });

          if (deletedUser) {
            console.log(`User with ID ${userid} has been deleted.`);
          } else {
            console.log(`User with ID ${userid} not found or already deleted.`);
          }

          return res.status(200).json({
            detail: uniqueID,
            message: "Payment verified successfully",
          });
        } else {
          console.log("No cart");
        }
      } else {
        console.log("400");
        return res.status(400).json({ message: "Invalid signature sent!" });
      }
    } catch (error) {
      console.log("500");
      res.status(500).json({ message: "Internal Server Error!" });
      console.log(error);
    }
  },
};

export default payment;
