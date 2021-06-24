const request = require("supertest");
const { app } = require("../../index");
const mongoDB = require("../../startup/databaseConnection");
const { Genre } = require("../../models/genre");

describe("/api/genres", () => {
  beforeAll(() => {
    mongoDB.connect();
  });
  afterAll((done) => {
    mongoDB.disconnect(done);
  });

  describe("GET /api/genres", () => {
    test("It should response the GET method", async () => {
      const res = await request(app).get("/api/genres");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(expect.any(Array));
      expect(res.body).toContainEqual(expect.any(Object));
      expect(res.body[0]).toHaveProperty("name");
    });
  });

  describe("GET /api/genres/:id", () => {
    test("it should return genre when valid id passed", async () => {
      const genre = new Genre({ name: "ahi" });
      await genre.save();
      const res = await request(app).get(`/api/genres/${genre._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("name");
    });
    test("it should status 404 when invalid id passed", async () => {
      const res = await request(app).get(`/api/genres/1`);

      expect(res.statusCode).toBe(404);
    });
  });
});
