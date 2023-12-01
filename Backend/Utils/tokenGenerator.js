import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userId, id) => {
  const payload = { userId, id };
  const secretKey = process.env.JWT_SECRET;

  const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });
  console.log(payload, token)

  return token;
};

export default generateToken;
