const assigment_model = require("../model/assigment");
const enroll_model = require("../model/enrollment");
let create_assigment = async (req, res) => {
  console.log(req.body, "This The Request Body");
  try {
    let obj = new assigment_model(req.body); /// oneComponat   for
    console.log(obj, "This The Final Object ");
    await obj.save();
    res.json({ msg: "Assigment Created Sucessfully" });
  } catch {
    res.json({ msg: "Failed Create Assigment" });
  }
};
let get_assigment = async (req, res) => {
  try {
    let obj = await assigment_model.find({
      // for Instructor Only Send And Get Their Assigment
      courseid: req.params.courseid,
    });
    res.json({
      msg: "Assigment Feteched Suceesfully",
      data: obj, /// SecondCoponant
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Gettting Data " });
  }
};
let get_my_assignments = async (req, res) => {
  try {
    const { user_email } = req.params;

    // 1. enrolled courses
    const enrollments = await enroll_model.find({ user_email });

    const courseIds = enrollments.map((c) => c.courseid);

    // 2. assignments of enrolled courses
    const assignments = await assigment_model.find({
      courseid: { $in: courseIds },
    });

    res.json({
      msg: "My assignments fetched ✅",
      count: assignments.length,
      data: assignments,
    });
  } catch (err) {
    console.log(err);
    res.json({ msg: "error" });
  }
};
module.exports = { create_assigment, get_assigment, get_my_assignments };
