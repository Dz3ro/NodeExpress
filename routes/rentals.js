const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Rental, validate } = require("../models/rental");

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("Could not find movie in database");
  res.send(rental);
});

router.post("/", async (req, res) => {
  //if (!req.body.title) return res.status(400).send("Bad input 123");
  const validation = validate(req.body);

  if (validation.error) return res.status(400).send(`Bad input`);

  const b = req.body;
  const rental = new Rental({
    customer: { _id: b.customer._id, name: b.customer.name },
    movie: { _id: b.movie._id, name: b.movie.title },
    dateRental: b.dateRental,
    dateReturn: b.dateReturn,
    dailyPenalty: b.dailyPenalty,
  });
  await rental.validate();
  const result = await rental.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const result = await Movie.findByIdAndDelete(id, function (e, doc) {
    if (e) console.error(`operation failed`, e);
    else {
      res.send(doc);
    }
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const movie = await Movie.findById(id);

  if (!movie) return res.status(404).send("Could not find genre in database");
  //if (!req.body.name) return res.status(400).send("invalid input");
  const validation = validate(req.body);
  if (validation.error) return res.status(400).send("Bad input");

  const b = req.body;
  rental.customer = { _id: b.customer._id, name: b.customer.name };
  rental.movie = { _id: b.movie._id, name: b.movie.title };
  rental.dateRental = b.dateRental;
  rental.dateReturn = b.dateReturn;
  rental.dailyPenalty = b.dailyPenalty;

  const result = await rental.save();
  res.send(result);
});

module.exports = router;
