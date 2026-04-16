const submission_model = require("../model/assigmentsubmission");

let submit_assgiment = async (req, res) => {
  try {
    const { assigmentid, user_email, courseid, submission_text, file_url } =
      req.body;

    const existing = await submission_model.findOne({
      assigmentid,
      user_email,
    });

    if (existing) {
      return res.json({
        msg: "Already submitted ❌",
      });
    }

    let obj = new submission_model({
      assigmentid,
      courseid,
      user_email,
      submission_text,
      file_url,
      status: "submitted",
    });

    await obj.save();

    res.json({
      msg: "Submitted Successfully ✅",
      data: obj,
    });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Failed ❌" });
  }
};
let get_assgimentsubmit = async (req, res) => {
  try {
    let obj = await submission_model.find({
      assigmentid: req.params.assigmentid,
    });

    res.json({
      msg: "Submitted Assignments Fetched ✅",
      count: obj.length,
      data: obj,
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Failed to get submitted assignments ❌",
    });
  }
};

// 🔥 3. UPDATE GRADE + FEEDBACK (FIXED)
let update_grade = async (req, res) => {
  try {
    const { assigmentid, student_email, marks, feedback } = req.body;

    await submission_model.findOneAndUpdate(
      {
        assigmentid,
        user_email,
      },
      {
        marks,
        feedback,
      },
    );

    res.json({
      msg: "Grade Updated Successfully ✅",
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Failed To Update Grade ❌",
    });
  }
};
let get_student_submissions = async (req, res) => {
  try {
    const { user_email, courseid } = req.params;

    const data = await submission_model.find({
      user_email: user_email,
      courseid: courseid,
    });

    res.json({
      msg: "Student submissions fetched ✅",
      count: data.length,
      data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Failed ❌",
    });
  }
};
let get_all_student_submissions = async (req, res) => {
  try {
    const { user_email } = req.params;

    const data = await submission_model.find({
      user_email: user_email,
    });

    res.json({
      msg: "All submissions fetched ✅",
      count: data.length,
      data,
    });
  } catch (err) {
    console.log(err);
    res.json({
      msg: "Failed ❌",
    });
  }
};

module.exports = {
  submit_assgiment,
  get_assgimentsubmit,
  update_grade,
  get_student_submissions,
  get_all_student_submissions,
};
