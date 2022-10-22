const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./Routes/auth");
const studentRoute = require("./Routes/student");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((error) => console.log(error));

//Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//Listen Port
app.listen(process.env.PORT || 3001, () => {
  console.log("Backend Server is running!!");
});

app.use("/api/auth", authRoute);
app.use("/api/student", studentRoute);
