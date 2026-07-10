import express from "express";

import userRoute from "../routes/user-route.js";
import productRoute from "../routes/product-route.js"

const router = express.Router();

router.use("/auth", userRoute);
router.use("/product", productRoute);


export default router;
