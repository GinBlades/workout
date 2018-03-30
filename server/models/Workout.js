const mongoose = require("mongoose");

let WorkoutSchema = mongoose.Schema({
    name: String,
    description: String,
    createdBy: mongoose.Schema.Types.ObjectId,
    lastRun: Date,
    exercises: [{
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        description: String,
        pictures: [String],
        duration: Number,
        position: Number,
        rest: Boolean
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
