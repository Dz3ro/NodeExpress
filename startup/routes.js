const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const login = require("../routes/login");
const home = require("../routes/home");
const returns = require("../routes/returns");

function setRoutes(app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/login", login);
  app.use("/api/returns", returns);

  app.use("/", home);
}

module.exports = setRoutes;
