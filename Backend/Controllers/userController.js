import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

import User from "../Models/userModel.js";
import MobileOTP from "../Models/mobileOTPModel.js";
// import generateToken from "../Utils/tokenGenerator.js";
import generateToken from "../utils/tokenGenerator.js";

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUM;

const client = twilio(accountSid, authToken);

const user = {
  createAccountOTP: async (req, res) => {
    console.log("create otp");
    try {
      const { phoneNumber } = req.body;
      const existingUser = await User.findOne({ phoneNumber });

      if (existingUser) {
        return res.json({
          status: 400,
          message: "An account with this phone number already exists",
        });
      }

      if (!existingUser) {
        const OTP = otpGenerator.generate(4, {
          digits: true,
          alphabets: false,
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        console.log(OTP);
        client.messages
          .create({
            body: `Welcome to EduConnect, please enter the otp to create account ${OTP}`,
            from: twilioNum,
            to: "+919526285088",
          })
          .then(async (message) => {
            const HashedOTP = await bcrypt.hash(OTP, 10);
            const newOTP = new MobileOTP({
              phoneNumber,
              OTP: HashedOTP,
            });
            await newOTP.save();

            res.status(200).json({
              status: 200,
              message:
                "An OTP (One-Time Password) has been sent to your mobile number",
            });
          })
          .catch(async (error) => {
            res.json({ status: 500, message: "Error sending OTP" });
          });
      }
    } catch (error) {
      return res.json({ status: 500, message: "internal server error" });
    }
  },

  checkOTP: async (req, res) => {
    try {
      const { OTP, phoneNumber } = req.body;

      const userData = await MobileOTP.findOne({ phoneNumber });
      if (userData) {
        const MatchOTP = await bcrypt.compare(OTP, userData.OTP);

        if (MatchOTP) {
          await MobileOTP.deleteOne({ phoneNumber });
          res.json({ status: 200, message: "OTP verified Successfully" });
        } else {
          res.json({
            status: 400,
            message: "Your entered OTP is wrong, Try again",
          });
        }
      } else {
        res.json({ status: 400, message: "It's an expired otp" });
      }
    } catch (error) {
      res.json({ status: 500, messgae: "Internal server Error" });
    }
  },

  userSignup: async (req, res) => {
    const { name, email, phoneNumber, password, userType } = req.body;
    try {
      const userExist = await User.findOne({
        $or: [{ email }, { phoneNumber }],
      });
      if (userExist) {
        let message;
        if (userExist.email === email) {
          message = "An account with this email already exists";
        } else if (userExist.phoneNumber == phoneNumber) {
          message = "An account with this phone number already exists";
        }
        return res.json({ status: 409, message });
      }
      if (!userExist) {
        const HashedPassword = await bcrypt.hash(password, 10);
        const isAccepted = userType === "student" ? true : false;
        const newUser = new User({
          name,
          email,
          phoneNumber,
          userType,
          isAccepted,
          password: HashedPassword,
        });
        await newUser.save();
        res.status(200).json({
          status: 200,
          message: "Your account has been created successfully!",
        });
      } else {
        res.send("Already Exist");
      }
    } catch (error) {
      console.log(error);
    }
  },

  addDetails: async (req, res) => {
    const { phoneNumber, skills, qualifications } = req.body;
    try {
      const updateDetails = await User.updateOne(
        { phoneNumber },
        {
          $set: { skills, qualifications },
        }
      );
      if (updateDetails) {
        return res.json({ status: 200, message: "Details added." });
      } else {
        return res.json({ status: 404, message: "Something went Wrong" });
      }
    } catch (error) {
      return res.json({ status: 500, message: error.message });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userFind = await User.findOne({ email });

      if (!userFind) {
        return res.json({ status: 409, message: "User Not Found!!!" });
      }

      if (!userFind.isBlocked) {
        if (!userFind.isAdmin) {
          const PasswordMatch = await bcrypt.compare(
            password,
            userFind.password
          );

          if (PasswordMatch) {
            const token = generateToken(userFind.email);
            res.json({
              status: 200,
              message: "User logged in.",
              userdetails: {
                id: userFind._id,
                name: userFind.name,
                email,
                image: userFind.image,
                userType: userFind.userType,
                phoneNumber: userFind.phoneNumber,
                token: token,
              },
            });
          } else {
            res.json({ status: 409, message: "Password incorrect" });
          }
        } else {
          return res.json({
            status: 409,
            message: "Entry is restricted",
          });
        }
      } else {
        return res.json({ status: 409, message: "User Account Blocked!!" });
      }
    } catch (err) {
      return res.json({ status: 500, error: err.errors });
    }
  },

  resetPasswordOTP: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      const existingOTP = await MobileOTP.findOne({ phoneNumber });

      if (existingOTP) {
        await MobileOTP.deleteOne({ phoneNumber });
      }
      const userData = await User.findOne({ phoneNumber });
      if (userData) {
        if (userData.isBlocked === false) {
          const OTP = otpGenerator.generate(4, {
            digits: true,
            alphabets: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
          console.log(OTP);

          client.messages
            .create({
              body: `Welcome back to EduConnect, please enter the otp to Change Password ${OTP}`,
              from: twilioNum,
              to: "+919526285088",
            })
            .then(async () => {
              const HashedOTP = await bcrypt.hash(OTP, 10);

              const newOTP = new MobileOTP({
                phoneNumber,
                OTP: HashedOTP,
              });

              await newOTP.save();

              res.status(200).json({
                status: 200,
                message:
                  "An OTP (One-Time Password) has been sent to your mobile number",
              });
            })
            .catch((error) => {
              res.json({ status: 500, message: "Error sending OTP" });
            });
        } else {
          res.json({ status: 400, message: "User is blocked" });
        }
      } else {
        res.json({ status: 404, message: "User not found!!" });
      }
    } catch (error) {
      res.json({ status: 500, message: "internal sever error" });
    }
  },

  resetPassword: async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
      const HashedPassword = await bcrypt.hash(password, 10);

      await User.updateOne(
        { phoneNumber },
        { $set: { password: HashedPassword } }
      );

      return res.json({ status: 200, message: "Password reset successfully" });
    } catch (error) {
      return res.json({ status: 500, message: "internal server error" });
    }
  },

  editProfile: async (req, res) => {
    const { name, id, email } = req.body;
    try {
      const image = req.file.filename;
      await User.findByIdAndUpdate(id, { $set: { name, image, email } });
      return res.json({ status: 200, message: "User Details Updated" });
    } catch (error) {
      return res.json({ status: 500, message: "Internal server error" });
    }
  },

  editProfileOnly: async (req, res) => {
    const { name, id, email } = req.body;
    try {
      await User.findByIdAndUpdate(id, { $set: { name, email } });
      return res.json({ status: 200, message: "User Details Updated" });
    } catch (error) {
      return res.json({ status: 500, message: "Internal server error" });
    }
  },
};

export default user;
