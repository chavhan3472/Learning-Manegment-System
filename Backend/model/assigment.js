let mongoose = require("mongoose");

let assigment_schma = mongoose.Schema({
  assigmentid: String,
  courseid: String,
  title: String,
  description: String,
  dueDate: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let assigment_model = mongoose.model("assigment_model", assigment_schma);

module.exports = assigment_model;
