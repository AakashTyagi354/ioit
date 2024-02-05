import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  PRN: String,
});

const Data = mongoose.model("data", dataSchema);

export default Data;
