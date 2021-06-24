const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/user");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res, next) => {
  const validation = validate(req.body);

  if (validation.error) return res.status(400).send(`Bad input`);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(`Invalid email or password`);

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) return res.status(400).send(`Invalid email or password`);

  ////
  const x = config.get("jwtPrivateKey");
  console.log(x);
  ///

  //const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  const token = user.generateJWToken();

  // res.send(token);
  res
    .header("x-auth-token", token)
    .send({ _id: user._id, name: user.name, email: user.email });
});

validate = (object) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100),
  });

  return schema.validate(object);
};

module.exports = router;
