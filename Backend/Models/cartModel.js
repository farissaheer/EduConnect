import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserDetails",
      required: true,
    },
    courses: [
      {
        courseid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "coursedetails",
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const Cart = mongoose.model("cartDetails", cartSchema);
export default Cart;
