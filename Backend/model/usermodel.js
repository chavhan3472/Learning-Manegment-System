let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  user_name: String,
  user_email: String,
  user_pasword: String,
  role: {
    type: String,
    default: "user",
  },
  user_phoneno: String,
});

let user_model = mongoose.model("user_registartion", userSchema);

module.exports = user_model;
