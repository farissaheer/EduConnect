import bcrypt from "bcrypt";

import User from "../Models/userModel.js";
import generateToken from "../utils/tokenGenerator.js";

const adminController = {
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const adminFind = await User.findOne({ email });

      if (!adminFind) {
        return res.json({ message: "Account Not Found" });
      }
      const passwordMatch = await bcrypt.compare(password, adminFind.password);
      if (passwordMatch) {
        if (adminFind.isAdmin) {
          const token = generateToken(adminFind.email);
          return res.status(200).json({
            status: 200,
            message: "Admin Loginned",
            adminDetails: {
              id: adminFind._id,
              name: adminFind.name,
              email,
              phoneNumber: adminFind.phoneNumber,
              token: token,
            },
          });
        } else {
          return res.status(200).json({
            status: 409,
            message: "Entry is restricted; it's not a admin account",
          });
        }
      } else {
        return res
          .status(200)
          .json({ status: 409, message: "Password incorrect" });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  userList: async (req, res) => {
    try {
      const userData = await User.find({ isAdmin: { $ne: true } }).select(
        "-password"
      );
      return res.status(200).json({
        status: 200,
        message: "User Data",
        userData,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  blockUser: async (req, res) => {
    const { userId } = req.body;
    try {
      const user = await User.findById(userId);
      const status = user.isBlocked ? false : true;
      const userData = await User.findByIdAndUpdate(userId, {
        $set: { isBlocked: status },
      });
      const message = userData.isBlocked
        ? "User UnBlocked Successfully"
        : "User Blocked Successfully";
      if (userData) {
        return res.status(200).json({
          status: 200,
          message,
        });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  unblockUser: async (req, res) => {
    const { id } = req.body;
    try {
      const userData = await User.findByIdAndUpdate(id, {
        $set: { isBlocked: false },
      });
      if (userData) {
        return res.status(200).json({
          status: 200,
          message: "User Unblocked Successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};

export default adminController;
