import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./utils/db.js";
dotenv.config();
const app = express();
app.use(express.json());

//connected  to the database
connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log("listening on port " + port);
});
