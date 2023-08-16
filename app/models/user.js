const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")

const isEmail = require("validator/lib/isEmail");
const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 64,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return isEmail(value);
      },
      message: function () {
        return "invalid email format";
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 128,
    validate: {
      validator: function (value) {
        return passwordFormat.test(value);
      },
      message: function () {
        return "Password should consist of at least 1 Uppercase, 1 number and 1 charecter";
      },
    },
  },
})

userSchema.pre("save", function (next) {
  const body = this
  bcryptjs.genSalt()
  .then((salt) => {
    bcryptjs.hash(body.password, salt)
      .then((encrypted) => {
      body.password = encrypted;
      next();
    })
  })
})

const User = mongoose.model("User", userSchema)

module.exports = User
