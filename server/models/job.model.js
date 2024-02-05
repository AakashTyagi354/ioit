import mongoose from "mongoose";

const jobSchema = mongoose.Schema();

const User = mongoose.model("Job", jobSchema);

export default User;
