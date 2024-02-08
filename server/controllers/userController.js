import User from "../models/user.model.js";
import Data from "../models/data.mdel.js";
import jwt from "jsonwebtoken";
import { sendToken } from "../utils/jwtToken.js";

//User register

export const registerUser = async (req, res, next) => {
  const { first_name, last_name, email, PRN, password } = req.body;
  const name = first_name + " " + last_name;
  const isvalid = await Data.find({ name, PRN: PRN });

  if (!isvalid) {
    return res.status(400).json({
      success: false,
      message: "Invalid User",
    });
  }

  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return res.status(400).json({
      success: false,
      message: "Already registered User",
    });
  }

  const user = await User.create({
    first_name,
    last_name,
    email,
    password,
    PRN,
  });

  sendToken(user, 200, res);
};

//User Login
export const userLogin = async (req, res, next) => {
  const { email, password, PRN } = req.body;

  if (!email || !password || !PRN) {
    return res.status(400).json({
      success: false,
      message: "Please enter email ,password and PRN",
    });
  }

  const user = await User.findOne({ email, PRN });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid User",
    });
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  sendToken(user, 200, res);
};
