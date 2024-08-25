const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./Config/database");
const userRoutes = require("./Routes/userRoutes.js");
const productRoutes = require("./Routes/productRoutes.js"); 
//const {insertDataFromJson} = require("./Controllers/productController.js");
const app = express();
const PORT = 3200;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();
//insertDataFromJson()
app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on port: ${PORT}`);
});
