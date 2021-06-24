const mongoose = require("mongoose");

const mongoDB = {
  connect: function () {
    mongoose
      .connect("mongodb://localhost:27017/vidly", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log("logged auccessfully to mongodb database"))
      .catch((e) => error.log("failed to log to mongodb database", e));
  },
  disconnect: function (done) {
    mongoose.disconnect(done);
  },
};

module.exports = mongoDB;
