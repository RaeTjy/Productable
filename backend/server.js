const express = require("express");
const products = require("./data/products");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((n) => n.sku === req.params.id);
  res.send(product);
});

// configure in env file, else default to port 3000
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server has started on port ${port}.`));
