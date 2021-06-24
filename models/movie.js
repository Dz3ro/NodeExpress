const Joi = require("joi");
const mongoose = require("mongoose");
const { schemaGenre } = require("./genre");

const schemaMovie = mongoose.Schema({
  title: { type: String, required: true, lowercase: true, tirm: true },
  genre: { type: schemaGenre, required: true },
  numberInStock: { type: Number, $min: 0 },
  dailyRentalRate: { type: Number, $min: 0 },
});

const Movie = mongoose.model("movies", schemaMovie);

validate = (object) => {
  const schema = Joi.object({
    title: Joi.string().required().min(1).max(50),
    genre: Joi.object(),
    numberInStock: Joi.number().min(0),
    dailyRentalRate: Joi.number().min(0),
  });

  return schema.validate(object);
};

module.exports.Movie = Movie;
module.exports.validate = validate;
