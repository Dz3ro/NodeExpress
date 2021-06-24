const express = require("express");
const app = express();
require("express-async-errors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const routes = require("./startup/routes");
const logger = require("./startup/winston");
const mongoDB = require("./startup/databaseConnection");

if (dotenv.error) {
  logger.error("error oocured while loading eviorment variables");
  process.exit(1);
}
routes(app);

app.use(function (err, req, res, next) {
  logger.error(err.messsage, err);
  res.status(500).send("middleware error handler called");
});

// app.listen(port, () => {
//   console.log(`listening at port ${port}`);
// });

mongoDB.connect();

module.exports.app = app;
