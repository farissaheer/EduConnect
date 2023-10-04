import mongoose from "mongoose";

const MobileOTPSchema = mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  OTP: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: 30 },
  },
});

const MobileOTP = new mongoose.model("MobileOTP", MobileOTPSchema);

export default MobileOTP;
