const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Workout = require("../models/Workout");

mongoose.connect("mongodb://192.168.1.111/workout");

router.get('/', async (req, res) => {
  let workouts = await Workout.find({});
  res.send(workouts);
});

router.get("/:id", async (req, res) => {
  let workout = await Workout.findById(req.params.id);
  res.json(workout);
})

router.post("/", async (req, res) => {
  let workout = new Workout(req.body);
  await workout.save();
  res.json(workout);
});

router.put("/:id", async (req, res) => {
  let workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json(workout);
});

router.delete("/:id",  async (req, res) => {
  await Workout.findByIdAndRemove(req.params.id);
  res.sendStatus(204);
});

// Add an exercise
router.post("/:id/exercises", async (req, res) => {
  let workout = await Workout.findByIdAndUpdate(req.params.id, {
    $push: {exercises: req.body}
  }, {new: true})

  res.json(workout);
});

// Update an exercise
router.put("/:id/exercises/:exerciseId", async (req, res) => {
  let workout = await Workout.findOneAndUpdate({_id: req.params.id, "exercises._id": req.params.exerciseId}, {
    $set: {"exercises.$": req.body}
  }, {new: true});

  res.json(workout);
});

// Remove an exercise
router.delete("/:id/exercises/:exerciseId", async (req, res) => {
  let workout = await Workout.findByIdAndUpdate(req.params.id, {
    $pull: {
      exercises: { _id: req.params.exerciseId }
    }
  }, {new: true})

  res.json(workout);
});

module.exports = router;
