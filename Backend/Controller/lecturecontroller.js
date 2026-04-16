const lecture_model = require("../model/lectures");

let add_lecture = async (req, res) => {
  try {
    let obj = new lecture_model(req.body);
    await obj.save();
    res.json({ msg: "Lecture Updated Sucefully" });
  } catch (error) {
    res.json({ msg: "Failed To Update " });
  }
};

module.exports = add_lecture;
