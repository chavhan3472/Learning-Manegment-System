let mongoose = require("mongoose");

let submission_schema = mongoose.Schema({
  assigmentid: {
    type: String,
    required: true,
  },

  courseid: {
    type: String,
    required: true,
  },

  user_email: {
    type: String,
    required: true,
  },

  submission_text: {
    type: String,
  },

  file_url: {
    type: String, // future file upload
  },

  submittedAt: {
    type: Date,
    default: Date.now,
  },

  marks: {
    type: Number,
    default: 0,
  },

  feedback: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
});
submission_schema.index({ assigmentid: 1, student_email: 1 }, { unique: true });

let submission_model = mongoose.model("submission_model", submission_schema);

module.exports = submission_model;
