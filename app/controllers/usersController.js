const User = require('../models/user')
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersController = {};

usersController.register = (req, res) => {
  const body = req.body;

  User.create(body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
}

usersController.login = (req, res) => {
  const body = req.body;
  User.findOne({ email: body.email })
  .then((user) => {
    if (!user) {
      res.json({
        errors: "Invalid email or password",
      })
    }
    bcryptjs.compare(body.password, user.password).then((match) => {
      console.log(match);
      if (match) {
        //res.json(user);
        const tokenData = {
          _id: user._id,
          email: user.email,
          userName: user.userName,
        }
        const token = jwt.sign(tokenData, "dct123", { expiresIn: "2d" });
        res.json({
          token: `Bearer ${token}`,
        })
      } else {
        res.json({ errors: "invalid email or password" });
      }
    });
    console.log(body.password, user.password);
  });
}

usersController.account = (req, res) => {
  res.json(req.user);
}

module.exports = usersController;
