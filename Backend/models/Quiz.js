const mongoose = require("mongoose");
const { Schema } = mongoose;
const QuizSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  totalgames: {
    type: Number,
  },
  gameswon: {
    type: Number,
  },
});
const Quiz = mongoose.model('quiz', QuizSchema);
module.exports = Quiz;