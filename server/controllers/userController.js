import User from "../models/user.model.js";
import Data from "../models/data.mdel.js";
import jwt from "jsonwebtoken";

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

  const isRegistered = await User.findOne({ email, password });

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

  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    token,
  });
};

//User Login
export const userLogin = async (req, res, next) => {
  const { email, password, PRN } = req.body;

  const user = await User.findOne({ email, password, PRN });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid User",
    });
  }
  const token = user.getJWTToken();

  res.status(200).json({
    success: true,
    message: "User logged in",
    token,
  });
};
