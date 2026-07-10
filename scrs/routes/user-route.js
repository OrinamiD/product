import express from "express";
import {
  forgotPassword,
  login,
  resetPasword,
  signup,
  verifyotp,
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify", verifyotp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password", resetPasword);

export default router;
