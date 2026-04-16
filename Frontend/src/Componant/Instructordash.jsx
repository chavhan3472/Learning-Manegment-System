import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import Ct from "./Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Instructordash() {
  const navigate = useNavigate();
  const obj = useContext(Ct);

  const [courses, setCourses] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getcookes = Cookies.get("login_data");
    const user = JSON.parse(getcookes);
    if (user.role != "admin") {
      navigate("/");
    } else {
      obj.updfun(user);
      fetchDashboardData(user.user_email);
    }
  }, []);
  const fetchDashboardData = async (user_email) => {
    try {
      const courseRes = await axios.get(
        `http://localhost:5000/mycourses/${user_email}`,
      );

      const coursesData = courseRes.data;
      setCourses(coursesData);
      setTotalCourses(coursesData.length);

      const promises = coursesData.map((course) =>
        axios.get(`http://localhost:5000/viewenrollment/${course.courseid}`),
      );

      const results = await Promise.all(promises);

      let total = 0;
      results.forEach((res) => {
        total += res.data.students ? res.data.students.length : 0;
      });

      setTotalStudents(total);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      {/* MAIN CONTENT */}
      <div className="flex-grow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">
            Welcome {obj.state.user_name} 👋
          </h1>

          <button
            onClick={() => navigate("/createcourse")}
            className="bg-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-700 shadow-lg"
          >
            + Create Course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h2>Total Courses</h2>
            <p className="text-5xl font-bold">{totalCourses}</p>
          </div>

          <div className="bg-gradient-to-r from-green-400 to-emerald-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition">
            <h2>Total Students</h2>
            <p className="text-5xl font-bold">{totalStudents}</p>
          </div>
        </div>

        {/* Course List */}
        <div className="bg-white text-black p-6 rounded-xl shadow mb-10">
          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>

          {courses.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {courses.slice(0, 4).map((course) => (
                <div
                  key={course.courseid}
                  className="border p-4 rounded-lg hover:shadow-md"
                >
                  <h3 className="font-bold">{course.title}</h3>

                  {/* 🔥 ONLY ADDED NAVIGATION BUTTONS */}
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() =>
                        navigate(`/viewstudentsenroll/${course.courseid}`)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      👨‍🎓 Students
                    </button>

                    <button
                      onClick={
                        () => navigate(`/viewassigment/${course.courseid}`)
                        // `/report/${course.assigmentid}/${course.courseid}`,
                      }
                      className="text-green-600 hover:underline"
                    >
                      View Assigment
                      {/* 📊 Report */}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No courses yet</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white text-black p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/viewcourseins")}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              📚 View Courses
            </button>

            <button
              onClick={() => navigate("/createcourse")}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              ➕ Create Course
            </button>

            <button
              onClick={() => {
                if (courses.length > 0) {
                  navigate(`/viewstudentsenroll/${courses[0].courseid}`);
                } else {
                  alert("No courses available");
                }
              }}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              👨‍🎓 View Students
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-gray-300 p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">Instructor Dashboard</h2>

        <p className="text-sm mb-3">Manage your courses, track students 🚀</p>

        <p className="text-xs text-gray-500">
          © 2026 LMS Platform | Built by Sahil
        </p>
      </footer>
    </div>
  );
}

export default Instructordash;
