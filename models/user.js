const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schemaUser = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

schemaUser.methods.generateJWToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY);
  return token;
};

const User = mongoose.model("users", schemaUser);

validate = (object) => {
  const schema = Joi.object({
    name: Joi.string().required().min(1).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100),
  });

  return schema.validate(object);
};

module.exports.User = User;
module.exports.validate = validate;
