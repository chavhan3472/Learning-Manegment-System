let mongoose = require("mongoose");

let enrollment_schema = mongoose.Schema({
  student_name: String,
  user_email: String,
  courseid: String,
  course_name: String,
  enroll_date: {
    type: Date,
    default: Date.now,
  },
});

let enroll_model = mongoose.model("enroll_model", enrollment_schema);
module.exports = enroll_model;
