const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
