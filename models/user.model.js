const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model("students", userSchema);

module.exports = userModel;
