const req = require("supertest");
const { app } = require("../../index");
const mongoDB = require("../../startup/databaseConnection");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");

const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

describe("/api/returns", () => {
  let rental;
  let customerId;
  let movieId;
  let token;

  beforeAll(async () => {
    mongoDB.connect();
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateJWToken();

    rental = new Rental({
      customer: { _id: customerId, name: "a" },
      movie: { _id: customerId, title: "a" },
    });
    await rental.save();
  });

  afterAll((done) => {
    //await Rental.remove({});
    mongoDB.disconnect(done);
  });

  describe("POST /api/returns", () => {
    test("return 401 if client is not logged in", async () => {
      const res = await req(app)
        .post(`/api/returns`)
        .send({ customerId, movieId });

      expect(res.statusCode).toBe(401);
    });

    test("return 400 if customer id is not provided", async () => {
      const res = await req(app)
        .post(`/api/returns`)
        .set("x-auth-token", token)
        .send({ movieId });

      expect(res.statusCode).toBe(400);
    });

    test("return 400 if movie id is not provided", async () => {
      const res = await req(app)
        .post(`/api/returns`)
        .set("x-auth-token", token)
        .send({ customerId });

      expect(res.statusCode).toBe(400);
    });

    test("return 404 if no rental found", async () => {
      const res = await req(app)
        .post(`/api/returns`)
        .set("x-auth-token", token)
        .send({ customerId, movieId });

      expect(res.statusCode).toBe(404);
    });
    test("return 400 if rental already processed", async () => {
      rental.dateReturn = rental.dateRental;
      await rental.save();
      const res = await req(app)
        .post(`/api/returns`)
        .set("x-auth-token", token)
        .send({ customerId, movieId });

      expect(res.statusCode).toBe(400);
    });

    test("return 200 if request is valid", async () => {
      const res = await req(app)
        .post(`/api/returns`)
        .set("x-auth-token", token)
        .send({ customerId, movieId });

      expect(res.statusCode).toBe(200);
    });
  });
});
