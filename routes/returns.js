const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Rental } = require("../models/rental");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  res.status(200).send("Hi");
});

router.post("/", async (req, res) => {
  if (!req.body.customerId) res.status(400).send("Bad request no customerId");
  if (!req.body.movieId) res.status(400).send("Bad request no movieId");

  if (!req.header("x-auth-token")) return res.status(401).send("Not Logged");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) return res.status(404).send("Rental not found");

  if (rental.dateReturn)
    return res.status(400).send("Rental already procedeed");

  return res.status(200).send("Request proceseeded succesfully");
});

module.exports = router;
