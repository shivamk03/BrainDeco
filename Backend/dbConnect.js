const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/quizgame";
const connectToDB = async () => {
  await mongoose.connect(mongoURI);
};
module.exports = connectToDB;
