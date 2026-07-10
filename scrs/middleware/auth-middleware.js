import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access denied" });
    }

    const splitToken = token.split(" ");

    const realToken = splitToken[1];

    const decoded = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`);

    if (!decoded) {
      return res.status(401).json({ message: "Forbidden" });
    }

    const user = await User.find(decoded?.id);

    if (!user) {
      return res.status(404).json({ message: "Incorrect details" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
