import Product from "../models/product-model.js";
import User from "../models/user-model.js";

export const createProduct = async (req, res) => {
  try {
    const { id, productName, quantity, price, role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const existingProduct = await Product.findOne({ productName });

    if (existingProduct) {
      return res.status(400).json({ message: "Product already exist" });
    }

    const newProduct = await new Product({
      userId: user?.id,
      productName,
      quantity,
      price,
    });

    await newProduct.save();

    return res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    // const { id } = req.params;

    // const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const product = await Product.find();

    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }

    return res
      .status(200)
      .json({ message: "Product retrieved successfully", product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
