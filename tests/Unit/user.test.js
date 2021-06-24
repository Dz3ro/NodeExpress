const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("generateJWToken", () => {
  test("should return a valid token", () => {
    const payload = { _id: new mongoose.Types.ObjectId().toHexString() };
    const user = new User(payload);

    process.env.JWT_KEY = "risitas";

    const token = user.generateJWToken();

    const decoded = jwt.decode(token, process.env.JWT_KEY);

    expect(decoded).toMatchObject(payload);
  });
});
