import dotenv from "dotenv";
import express, { Router } from "express";
import { connectDB } from "./utils/db.js";
import { userRouter } from "./routes/user.route.js";

dotenv.config();
const app = express();
app.use(express.json());

//connected  to the database
connectDB();

app.use("/api/v1",userRouter)

const port = process.env.PORT;
app.listen(port, () => {
  console.log("listening on port " + port);
});
