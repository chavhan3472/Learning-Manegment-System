let mongoose = require("mongoose");

let lecture_schema = mongoose.Schema({
  courseid: String,
  title: String,

  videoUrl: String,

  duration: String,

  order: Number,
});

let lecture_model = mongoose.model("lecture_model", lecture_schema);

module.exports = lecture_model;
