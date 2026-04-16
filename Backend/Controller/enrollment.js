const enroll_model = require("../model/enrollment");

let enroll_course = async (req, res) => {
  console.log(req.body, "This The Enroll Course");
  try {
    let obj = new enroll_model(req.body);
    await obj.save();
    res.json({ msg: "Enrollment Sucessfully" });
  } catch (error) {
    res.json({ msg: "Failed To get The Course" });
  }
};

let get_enroll = async (req, res) => {
  try {
    let data = await enroll_model.find();
    res.json(data);
  } catch {
    res.json({ msg: "Failed To Getting the data" });
  }
};
let view_enrollment = async (req, res) => {
  try {
    const { courseid } = req.params;

    const data = await enroll_model.find({ courseid });

    res.json({
      count: data.length,
      students: data,
    });
  } catch (error) {
    res.json({ msg: "Error fetching enrollments" });
  }
};

let getsingal_enroll = async (req, res) => {
  try {
    let obj = await enroll_model.find({
      user_email: req.params.user_email,
    });
    res.json(obj);
  } catch (err) {
    res.json({ msg: "No Course Found", error: err.message });
  }
};

module.exports = {
  enroll_course,
  get_enroll,
  view_enrollment,
  getsingal_enroll,
};
