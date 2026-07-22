const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// The `id` field is naturally handled by Mongoose's virtual `id` (or `_id`).
const User = mongoose.model("User", userSchema);

module.exports = User;
