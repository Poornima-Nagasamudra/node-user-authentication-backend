const express = require("express");
const app = express();
const confugureDb = require("./config/database");
confugureDb();
const routes = require("./config/routes");
const port = 3050;

app.use(express.json());
app.use("/", routes)

app.listen(port, () => {
  console.log("listining on port", port);
});
