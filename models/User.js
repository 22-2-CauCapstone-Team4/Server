const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
    nickname: {
      type: String,
      unique: true,
      required: true,
      minlength: 1,
      maxlength: 8,
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);
module.exports = { User };
