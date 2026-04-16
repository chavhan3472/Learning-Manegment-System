let course_model = require("../model/course");
let multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "courseimg");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1],
    );
  },
});

const upload = multer({ storage: storage });
let create_course = async (req, res) => {
  console.log(req.body, "This The Request Body ");
  console.log(req.file, "This The File");

  try {
    if (typeof req.body.lectures === "string") {
      req.body.lectures = JSON.parse(req.body.lectures);
    }

    req.body.thumbnail = req.file ? req.file.filename : "";

    let obj = new course_model(req.body);
    await obj.save();

    res.json({ msg: "Course Added" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Add Course" });
  }
};

let get_courses = async (req, res) => {
  try {
    let data = await course_model.find();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Fetch Courses" });
  }
};

let get_single_course = async (req, res) => {
  try {
    let data = await course_model.findOne({
      courseid: req.params.courseid,
    });

    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Fetch Course" });
  }
};

let get_coursebyinsid = async (req, res) => {
  try {
    let user_email = req.params.user_email;

    let courses = await course_model.find({
      instructorid: user_email,
    });

    res.json(courses);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Fetch Instructor Courses" });
  }
};

let update_course = async (req, res) => {
  try {
    let data = await course_model.findByIdAndUpdate(
      req.params.courseid,
      req.body,
      {
        new: true,
      },
    );

    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Update Course" });
  }
};

let delete_course = async (req, res) => {
  try {
    await course_model.findByIdAndDelete(req.params.courseid);

    res.json({ msg: "Course Deleted" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Failed To Delete Course" });
  }
};
module.exports = {
  create_course,
  get_courses,
  get_single_course,
  update_course,
  delete_course,
  upload,
  get_coursebyinsid,
};
