import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Mycourse() {
  const navigate = useNavigate();

  const cookie = Cookies.get("login_data");
  const user = cookie ? JSON.parse(cookie) : null;

  const user_email = user?.user_email;
  const user_name = user?.name;

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!user_email) {
      navigate("/");
      return;
    }

    fetchCourses();
  }, []);

  let fetchCourses = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/studentenroll/${user_email}`,
      );

      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      {/* 🔙 TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🎓 My Courses</h1>

        <button
          onClick={() => navigate("/studentdash")}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition"
        >
          ⬅ Back
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-xl p-4 mb-6 text-center">
        <h2 className="text-xl font-semibold">👋 Welcome, {user.user_name}</h2>
        <p className="text-gray-500 text-sm">Here are your enrolled courses</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-md shadow-md rounded-xl p-5 border hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-lg font-bold text-blue-700 mb-2">
              {course.course_name}
            </h2>

            <p className="text-sm text-gray-700">
              <b>Course ID:</b> {course.courseid}
            </p>

            <p className="text-sm text-gray-700">
              <b>Student:</b> {course.student_name}
            </p>

            <p className="text-sm text-gray-700">
              <b>Email:</b> {course.user_email}
            </p>

            <p className="text-sm text-gray-700 mb-3">
              <b>Enroll Date:</b>{" "}
              {new Date(course.enroll_date).toLocaleDateString()}
            </p>

            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800 transition"
              onClick={() => navigate(`/myassignment/${course.courseid}`)}
            >
              📌 View Assignment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mycourse;
