import mongoose from "mongoose";

const usercSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    otp: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    },
    isverified: {
      type: Boolean,
    },

    expiredAt: Date,
  },
  { timestamps: true },
);

const User = new mongoose.model("User", usercSchema);

export default User;
