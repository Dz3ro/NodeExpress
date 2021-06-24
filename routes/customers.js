const express = require("express");
const router = express.Router();
const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("Could not find genre in database");
  res.send(customer);
});

router.post("/", async (req, res) => {
  if (!req.body.name) return res.status(400).send("Bad input 123");
  const validation = validate(req.body);

  if (validation.error) return res.status(400).send(`Bad input`);

  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  try {
    await customer.validate();
  } catch (e) {
    error.log("object failed validation");
  }
  const result = await customer.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Customer.findByIdAndDelete(id, function (e, doc) {
    if (e) console.error(`operation failed`, e);
    else {
      res.send(doc);
    }
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);

  if (!customer)
    return res.status(404).send("Could not find genre in database");
  if (!req.body.name) return res.status(400).send("invalid input");
  const validation = validate(req.body);
  if (validation.error) return res.status(400).send("Bad input");

  customer.name = req.body.name;
  customer.phone = req.body.phone;
  customer.isGold = req.body.isGold;

  const result = await customer.save();
  res.send(result);
});

module.exports = router;
