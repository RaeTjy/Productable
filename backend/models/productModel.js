const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
