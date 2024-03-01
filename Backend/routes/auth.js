const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const secPass = "Quizgame@1";
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500).json({
        success: false,
        message: "Please enter the correct values in Fields",
      });
    }
    try {
      let success = false;
      const user =await User.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ success, error: "This email already exists" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: securePassword,
        });
        const data = {
          user: {
            id: user.id,
          },
        };
        const token = await jwt.sign(data, secPass);
        success = true;
        res.status(200).json({ success, token });
      }
    } catch (e) {
      res.status(500).send("Some error Occurred");
    }
  }
);
router.post(
  "/",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      res.status(500).json({ success: false, error: validationResult.Array() });
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(500).json({
          success: false,
          error: "Please enter the correct credentials",
        });
      }
      const passCompare = await bcrypt.compare(req.body.password, user.password);
      if (!passCompare) {
        res.status(500).json({
          success: false,
          error: "Please enter the correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = await jwt.sign(data, secPass);
      res.status(200).json({ success: true, token });
    } catch (e) {
      res.status(501).json({ success: false, error: e });
    }
  }
);
router.post("/fetchuser", async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      res
        .status(401)
        .json({
          success: false,
          error: "Please authenticate using a valid token",
        });
    }
    const data = await jwt.verify(token, secPass);
    const id = data.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          error: "Please authenticate using a valid token",
        });
    }
    res.status(200).json({ success: true, user });
  } catch (e) {
    res.status(401).send("Some error occurred");
  }
});
module.exports=router;