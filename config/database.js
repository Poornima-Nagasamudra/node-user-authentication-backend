const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const configureDb = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/user-auth", {
      useNewUrlParser: true,
      //useUndefinedTopology: true,
      //useCreateIndex: true,
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = configureDb;
