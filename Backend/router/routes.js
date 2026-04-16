let express = require("express");
const { user_registartion, user_login } = require("../Controller/controller");
const {
  create_course,
  get_courses,
  get_single_course,
  update_course,
  delete_course,
  upload,
  get_coursebyinsid,
} = require("../Controller/coursecontroller");
const add_lecture = require("../Controller/lecturecontroller");
const {
  enroll_course,
  get_enroll,
  view_enrollment,
  getsingal_enroll,
} = require("../Controller/enrollment");
const {
  create_assigment,
  get_assigment,
  get_my_assignments,
} = require("../Controller/assigmentcontroller"); // For Instructor Only
const {
  submit_assgiment,
  get_assgimentsubmit,
  update_grade,
  get_student_submissions,
  get_all_student_submissions,
} = require("../Controller/submitassgment"); // For Student Only
let mini_app = express.Router();
mini_app.post("/userregistartion", user_registartion);
mini_app.post("/userlogin", user_login);
mini_app.post("/createcourse", upload.single("thumbnail"), create_course); /// For New Course Create
mini_app.get("/getallcourse", get_courses); // for get all courses
mini_app.get("/mycourses/:user_email", get_coursebyinsid);
mini_app.get("/getsindalcourse/:courseid", get_single_course); // for get singal courses
mini_app.put("/updatecourse/:courseid", update_course); // for update Singal Course
mini_app.delete("/delatecourse/:courseid", delete_course); // for delate Singal Course
mini_app.post("/addlecture", add_lecture); // for add lecture
mini_app.post("/enrollcourse", enroll_course); // for course Enrollment
mini_app.get("/getallenrollcourse", get_enroll); // For all Enrollment Details
mini_app.get("/studentenroll/:user_email", getsingal_enroll); //  for singal student show
mini_app.get("/viewenrollment/:courseid", view_enrollment); // for get singal course enrollment
mini_app.post("/createassigment", create_assigment); // For Creating Assigment  For Instructor
mini_app.get("/getassigment/:courseid", get_assigment); // get assgiment By courseId
// mini_app.post("/submitfinalassgment", submit_assgiment); // subnit final assigmentmini
// mini_app.get("/getsubmmitedassgiment/:assignmentid", get_assgimentsubmit); // getsubmmitedassigment assigment
// mini_app.put("/updatestudentgrade", update_grade);
mini_app.post("/submitfinalassignment", submit_assgiment); // for student Only
mini_app.get("/getsubmmitedassgiment/:assigmentid", get_assgimentsubmit);
mini_app.get(
  "/getstudentsubmission/:user_email/:courseid",
  get_student_submissions,
);
mini_app.get("/getstudentsubmission/:user_email", get_all_student_submissions); /// for particular Students
mini_app.put("/updatestudentgrade", update_grade);
mini_app.get("/myassignments/:user_email", get_my_assignments); /// for navigating student dash to direct viewassgiment s
module.exports = mini_app;
