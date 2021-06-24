const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  if (!req.body.name) return res.status(400).send("Bad input 123");
  const validation = validate(req.body);

  if (validation.error) return res.status(400).send(`Bad input`);

  const check = await User.findOne({ email: req.body.email });
  if (check) {
    console.log(check);
    return res.status(400).send(`that email is already taken`);
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  /////////
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(user.password, salt);
  user.password = hashedPass;
  /////////

  const result = await user.save();
  res.send(result);
});

module.exports = router;
