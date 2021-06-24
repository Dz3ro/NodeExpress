const { date } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

const schemaCustomer = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, minLength: 1, maxLength: 50 },
});
const schemaMovie = mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true, minLength: 1, maxLength: 50 },
});

const schemaRental = mongoose.Schema({
  customer: { type: schemaCustomer, required: true },
  movie: { type: schemaMovie, required: true },
  dateRental: {
    type: Date,
    default: () => Date.now(),
  },
  dateReturn: {
    type: Date,
  },
  dailyPenalty: { type: Number, min: 0, default: 1 },
});

const Rental = mongoose.model("rentals", schemaRental);

validate = (object) => {
  const schema = Joi.object({
    customer: Joi.object({ id: Joi.string().required(), name: Joi.string() }),
    movie: Joi.object({ id: Joi.string().required(), title: Joi.string() }),
    dateRental: Joi.date(),
    dateReturn: Joi.date(),
    dailyPenalty: Joi.number().min(0).max(5),
  });

  return schema.validate(object);
};

module.exports.Rental = Rental;
module.exports.validate = validate;
