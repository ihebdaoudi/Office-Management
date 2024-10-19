const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, require: true },
    role: {
      type: String,
      enum: ["super_admin","tech", "normal"],
      default: "normal",
      required: true,
    },
    picture: { type: String },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
