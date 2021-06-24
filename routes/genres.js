const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Genre, validate } = require("../models/genre");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Could not find genre in database");

  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Could not find genre in database");
  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  if (!req.body.name) return res.status(400).send("Bad input 123");
  const validation = validate(req.body);

  if (validation.error) return res.status(400).send(`Bad input`);

  const genre = new Genre({ name: req.body.name });
  try {
    await genre.validate();
  } catch (e) {
    error.log("object failed validation");
  }
  const result = await genre.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const result = await Genre.findByIdAndDelete(id, function (e, doc) {
    if (e) console.error(`operation failed`, e);
    else {
      res.send(doc);
    }
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const genre = await Genre.findById(id);

  if (!genre) return res.status(404).send("Could not find genre in database");
  if (!req.body.name) return res.status(400).send("invalid input");
  const validation = validate(req.body);
  if (validation.error) return res.status(400).send("Bad input");

  genre.name = req.body.name;
  const result = await genre.save();

  res.send(result);
});

module.exports = router;
