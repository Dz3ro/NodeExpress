const Joi = require("joi");
const mongoose = require("mongoose");

const schemaGenre = mongoose.Schema({
  name: { type: String, required: true, lowercase: true, tirm: true },
});

const Genre = mongoose.model("genres", schemaGenre);

validate = (object) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(20),
  });

  return schema.validate(object);
};

module.exports.Genre = Genre;
module.exports.validate = validate;
module.exports.schemaGenre = schemaGenre;
