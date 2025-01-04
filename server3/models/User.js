const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[0-9]+$/.test(v); // Ensures only numeric characters
        },
        message: (props) => `${props.value} is not a valid numeric username!`,
      },
      minlength: 10,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Ensures valid email format
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
    },
    is_admin: {
      type: Boolean,
      required: true,
      default: false, // Default to true, assuming new users are active by default
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true, // Default to true, assuming new users are active by default
    },
  },
  {
    collection: "Users", // Explicit collection name
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const User = mongoose.model('User', SignUpSchema);
module.exports = {User};
