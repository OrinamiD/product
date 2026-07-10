import express from "express";
import { validateProduct } from "../middleware/product-middleware.js";
import { auth } from "../middleware/auth-middleware.js";
import {
  createProduct,
  getAllProduct,
} from "../controllers/product-controller.js";

const router = express.Router();

router.post("/create", validateProduct, auth, createProduct);
router.get("/get-all/:id", auth, getAllProduct);

export default router;
