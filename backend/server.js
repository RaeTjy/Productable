const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
dotenv.config();
connectDB();
app.use(express.json({ limit: "50mb" }));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// configure in env file, else default to port 5000
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server has started on port ${port}.`));
