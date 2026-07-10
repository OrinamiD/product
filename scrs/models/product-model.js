import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    productName: {
      type: String,
      trim: true,
      require: true,
    },

    quantity: {
      type: Number,
      require: true,
    },

    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true },
);

const Product = new mongoose.model("Product", productSchema);

export default Product;
