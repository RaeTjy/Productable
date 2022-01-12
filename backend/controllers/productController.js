const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProductNumber = async (req, res) => {
  try {
    const count = await Product.countDocuments({});
    res.status(200).json(count);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  const { skip, limit } = req.body;

  try {
    const product = await Product.find().skip(skip).limit(limit);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addProduct = asyncHandler(async (req, res) => {
  const { sku, title, image } = req.body;

  const productExists = await Product.findOne({ sku });

  if (productExists) {
    res.status(400);
    throw new Error("Product Already Exists!");
  } else {
    const product = await Product.create({
      sku,
      title,
      image,
    });
    if (product) {
      // product successfully created
      res.status(200).json({
        _id: product._id,
        sku: product.name,
        title: product.email,
        image: product.image,
      });
    } else {
      // product failed to create in mongodb
      res.status(400);
      throw new Error("Product failed to create");
    }
  }
});

const modifyProduct = asyncHandler(async (req, res) => {
  const { sku, title, image } = req.body;

  const product = await Product.findOneAndUpdate(
    { sku: sku },
    {
      title,
      image,
    }
  );
  if (product) {
    // product successfully updated
    res.status(200).json({
      _id: product._id,
      sku: product.name,
      title: product.email,
      image: product.image,
    });
  } else {
    // product failed to update
    res.status(400);
    throw new Error("Product failed to update");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const sku = req.body;
  try {
    await Product.deleteOne(sku);
    res.status(200).json({});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = {
  getProductNumber,
  getProducts,
  addProduct,
  modifyProduct,
  deleteProduct,
};
