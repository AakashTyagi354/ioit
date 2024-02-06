import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  PRN: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
    minLength: 8,
  },
  Applied: {
    type: Array,
  },
  Notification: {
    type: Array,
  },
  TimeRanges: true,
});

export const User = mongoose.model("user", userSchema);
