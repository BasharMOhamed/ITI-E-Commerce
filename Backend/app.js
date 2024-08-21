const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./Config/database");
const userRoutes = require("./Routes/userRoutes.js");
const app = express();
const PORT = 4200;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on port: ${PORT}`);
});
