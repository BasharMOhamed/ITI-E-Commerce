const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./Config/database");
const userRoutes = require("./Routes/userRoutes.js");
const cartRoutes = require("./Routes/cartRoutes.js");
const productRoutes = require("./Routes/productRoutes.js");
//const {insertDataFromJson} = require("./Controllers/productController.js");
const app = express();
const PORT = 4100;

app.use(cors({ origin: "http://localhost:4200", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();
//insertDataFromJson()
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on port: ${PORT}`);
});
