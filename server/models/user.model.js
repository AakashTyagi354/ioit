import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    PRN: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    applied: {
      type: [
        {
          job_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
          },
          applied_date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    notifications: {
      type: [
        {
          message: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

//using bcryptjs to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
//JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

//compare password

userSchema.methods.comparePassword = async function (enteredpassword) {
  const ans = await bcrypt.compare(enteredpassword, this.password);
  return ans;
};

const User = mongoose.model("User", userSchema);

export default User;
