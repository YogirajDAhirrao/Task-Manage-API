import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import connectDB from "./config/db_connect.js";
import signUpRouter from "./routes/signup.route.js";
import loginRouter from "./routes/login.route.js";
import verifyJWT from "./middlewares/verifyJWT.js";
import taskRouter from "./routes/task.route.js";

configDotenv();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("SET UP");
});

app.use("/signup", signUpRouter);
app.use("/login", loginRouter);

app.use(verifyJWT);
app.use("/mytasks", taskRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("set up");
});
