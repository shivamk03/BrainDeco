const Quiz = require("../models/Quiz");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secPass = "Quizgame@1";

router.get("/", async (req, res) => {
  const token = req.header("auth-token");
  const data = await jwt.verify(token, secPass);
  const userId = data.user.id;
  const quizdata = await Quiz.findOne({ user: userId });
  if (!quizdata) {
    const data = {
      user: userId,
      totalgames: 0,
      gameswon: 0,
    };
    const createduser = await Quiz.create(data);
    res
      .status(200)
      .json({
        success: true,
        id: createduser._id,
        totalgames: createduser.totalgames,
        gameswon: createduser.gameswon,
      });
  }
  else{
    res.status(200).json({success:true,id:quizdata._id ,totalgames:quizdata.totalgames,gameswon:quizdata.gameswon});
  }
});

router.put("/update", async (req, res) => {
  try {
    const token = req.header("auth-token");
    const jwtdata = await jwt.verify(token, secPass);
    const userId = jwtdata.user.id;
    const data = {
      totalgames: req.body.totalgames,
      gameswon: req.body.gameswon,
    };
    const quiz = await Quiz.findOne({user : userId});
    if (!quiz) {
      res.status(400).json({ success: false, error: "Data not found" });
    }
    const quizdata = await Quiz.findByIdAndUpdate(
      quiz.id,
      { $set: data },
      { new: true }
    );
    res.status(200).json({ success: true, quizdata });
  } catch (e) {
    res.status(400).json({ success: false });
  }
});
module.exports = router;
