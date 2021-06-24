const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Movie, validate } = require("../models/movie");

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Could not find movie in database");
  res.send(movie);
});

router.post("/", async (req, res) => {
  if (!req.body.title) return res.status(400).send("Bad input 123");
  const validation = validate(req.body);

  if (validation.error) return res.status(400).send(`Bad input`);

  const b = req.body;
  const movie = new Movie({
    title: b.title,
    genre: { _id: b.genre._id, name: b.genre.name },
    numberInStock: b.numberInStock,
    dailyRentalRate: b.dailyRentalRate,
  });

  await movie.validate();

  const result = await movie.save();
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
  if (!req.body.name) return res.status(400).send("invalid input");
  const validation = validate(req.body);
  if (validation.error) return res.status(400).send("Bad input");

  const b = req.body;
  movie.title = b.name;
  movie.genre = b.genre;
  movie.numberInStock = b.numberInStock;
  movie.dailyRentalRate = b.dailyRentalRate;

  const result = await movie.save();

  res.send(result);
});

module.exports = router;
