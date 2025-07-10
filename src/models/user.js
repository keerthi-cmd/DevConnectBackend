const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
      maxLength: 40,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "Others"].includes(value)) {
          throw new Error("Gender data isnot valid");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
