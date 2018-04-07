const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secrets = require("../secrets");

mongoose.connect(secrets.mongoConn);

router.get('/', async (req, res, next) => {
  let users = await User.find({});
  res.send(users);
});

router.get("/:id", async (req, res, next) => {
  let user = await User.find({_id: req.params.id});
  res.json(user);
})

router.post("/", async (req, res, next) => {
  let demo = new User(req.body);
  let user = await demo.save();
  res.json(user);
});

router.put("/:id", async (req, res, next) => {
  let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true});
  res.json(user);
});

router.delete("/:id",  async (req, res, next) => {
  await User.findOneAndRemove({ _id: req.params.id });
  res.sendStatus(204);
});

router.get("/auth/:token", (req, res) => {
  let decoded = jwt.verify(req.params.token, secrets.jwtSecret);
  if (decoded) {
    res.json({email: decoded.email});
  } else {
    res.json({error: "Invalid token"});
  }
});

module.exports = router;
