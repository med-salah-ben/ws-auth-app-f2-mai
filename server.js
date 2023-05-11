const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");

const app = express();
connectDB();

//use middleware
app.use(express.json());
app.use("/api/auth",require("./routes/userRoute"));

const PORT = process.env.PORT || 5050;

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`server is running on port ${PORT}`);
});
