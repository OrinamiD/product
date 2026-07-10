import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import User from "../models/user-model.js";
import registrationEmail from "../mail/register-email.js";
import forgotPasswordEmail from "../mail/forgot-password.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      return res.status(400).json({ message: "FirstName is required" });
    }
    if (!lastName) {
      return res.status(400).json({ message: "lastName is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const otp = Math.floor(100000 + Math.random() * 100000).toString();

    if (!otp) {
      return res.status(400).json({ message: "Otp did not generate" });
    }

    const newUser = await new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      otp: otp,
      expiredAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await newUser.save();

    // send mail

    await registrationEmail(email, otp, firstName, lastName);

    return res
      .status(201)
      .json({ message: "User created successfully", newUser });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const verifyotp = async (req, res) => {
  try {
    const { id, opt } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    // if (!otp) {
    //   return res.status(400).json({ message: "Otp is required" });
    // }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // if (user.otp || !user.expiredAt) {
    //   return res.status(400).json({ message: "No otp sent" });
    // }

    if (user.isverified === true) {
      return res.status(400).json({ message: "Account already verified" });
    }

    if (user.expiredAt < new Date()) {
      return res.status(404).json({ message: "Otp expired" });
    }

    user.isverified = true;

    await user.save();

    // return user;
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(402).json({ message: "Incorrect password or email" });
    }

    const accessToken = jwt.sign(
      { user_id: user?._id },
      `${process.env.ACCESS_TOKEN}`,
      { expiresIn: "3m" },
    );

    const refreshToken = jwt.sign(
      { user_id: user?._id },
      `${process.env.REFRESH_TOKEN}`,
      { expiresIn: "7d" },
    );

    user.password = undefined;
    user.otp = undefined;

    return res
      .status(200)
      .json({ message: "Login successfull", UserDetails: user, accessToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const otp = Math.floor(100000 + Math.random() * 100000).toString();

    if (!otp) {
      return res.status(400).json({ message: "Cant generate otp" });
    }

    // const updateOTP = await User.findByIdAndUpdate(
    //   id,
    //   (user.expiredAt = new Date(Date.now() + 5 * 60 * 1000)),
    //   { otp: otp },
    //   { new: true },
    // );

    // await updateOTP.save();

    // send mail

    await forgotPasswordEmail(user.email, otp);

    return res
      .status(200)
      .json({ message: "Check your email for your reset otp code" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const resetPasword = async (req, res) => {
  try {
    const { id, otp, password } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    if (!otp) {
      return res.status(400).json({ message: "otp is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Incorrect Details" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const savedPassword = await User.findByIdAndUpdate(
      id,
      {
        password: hashPassword,
      },
      { new: true },
    );

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
