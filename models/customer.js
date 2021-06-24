const Joi = require("joi");
const mongoose = require("mongoose");

const schemaCustomer = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100,
    lowercase: true,
    tirm: true,
  },
  isGold: { type: Boolean, default: false },
  phone: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
    lowercase: true,
    tirm: true,
  },
});

const Customer = mongoose.model("customers", schemaCustomer);

validate = (object) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(100),
    phone: Joi.string().required().min(2).max(20),
    isGold: Joi.boolean(),
  });

  return schema.validate(object);
};

module.exports.Customer = Customer;
module.exports.validate = validate;
