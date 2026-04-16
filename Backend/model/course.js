let mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseid: String,
  title: String,
  description: String,
  instructor: String, // for instructor name
  category: String,
  courseprice: String,
  level: String,
  instructorid: String,
  lectures: [
    {
      title: String,
      videoUrl: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  thumbnail: String,
});

let course_model = mongoose.model("course_model", courseSchema);

module.exports = course_model;
