import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import Ct from "./Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Studentdash() {
  const navigate = useNavigate();
  const obj = useContext(Ct);
  const [courses, setCourses] = useState([]);
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [submittedCount, setSubmittedCount] = useState(0);
  useEffect(() => {
    const getcookies = Cookies.get("login_data");

    if (!getcookies) {
      navigate("/");
      return;
    } else {
      const user = JSON.parse(getcookies);
      obj.updfun(user);

      fetchStats(user.user_email); // ✅ ADDED
    }

    fetchCourses();
  }, []);

  // ---------------- COURSES ----------------
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getallcourse");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- STATS (NEW FUNCTION) ----------------
  const fetchStats = async (user_email) => {
    try {
      const [enrollRes, assignRes, subRes] = await Promise.all([
        axios.get(`http://localhost:5000/studentenroll/${user_email}`),
        axios.get(`http://localhost:5000/myassignments/${user_email}`),
        axios.get(`http://localhost:5000/getstudentsubmission/${user_email}`),
      ]);
      console.log(enrollRes.data, "This The Data");
      const enrolled = enrollRes.data.length || 0;
      const assignments = assignRes.data.data || [];
      const submissions = subRes.data.data || [];

      const submittedIds = submissions.map((s) => s.assigmentid);

      const pending = assignments.filter(
        (a) => !submittedIds.includes(a.assigmentid),
      );

      setEnrolledCount(enrolled);
      setPendingCount(pending.length);
      setSubmittedCount(submittedIds.length);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- NAVIGATION ----------------
  let mycourse = (user_email) => {
    navigate("/mycourse", { state: { user_email } });
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-full md:w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white p-5">
        <h2 className="text-2xl font-bold mb-8">📚 LMS | MERN</h2>

        <ul className="space-y-3">
          <li>
            <button className="w-full text-left bg-blue-800 p-2 rounded">
              Dashboard
            </button>
          </li>

          <li>
            <button onClick={() => mycourse(obj.state.user_email)}>
              My Courses
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate(`/myassignments/${obj.state.user_email}`)}
              className="w-full text-left hover:bg-blue-800 p-2 rounded"
            >
              Assignments
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/profile")}
              className="w-full text-left hover:bg-blue-800 p-2 rounded"
            >
              Profile
            </button>
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back, {obj.state.user_name} 👋
          </h1>
          <p className="text-gray-500">Continue your learning journey</p>
        </div>

        {/* 📊 REAL TIME CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card title="Enrolled Courses" value={enrolledCount} />
          <Card title="Pending Assignments" value={pendingCount} />
          <Card title="Submitted Assignments" value={submittedCount} />
          <Card
            title="Progress"
            value={
              submittedCount + pendingCount === 0
                ? "0%"
                : `${Math.round(
                    (submittedCount / (submittedCount + pendingCount)) * 100,
                  )}%`
            }
          />
        </div>

        {/* 📢 NOTIFICATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-bold mb-3">📢 Announcements</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• New assignments uploaded</li>
              <li>• React course updated</li>
              <li>• Live class tomorrow at 11 AM</li>
            </ul>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-bold mb-3">⚡ Recent Activity</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• You viewed React course</li>
              <li>• Quiz completed (85%)</li>
              <li>• Profile updated</li>
            </ul>
          </div>
        </div>

        {/* 🎴 COURSES */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-lg font-bold mb-4">🔥 Available Courses</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <div
                key={course.courseid}
                className="border rounded-lg overflow-hidden bg-white hover:shadow-xl transition"
              >
                <img
                  src={`http://localhost:5000/courseimg/${course.thumbnail}`}
                  alt={course.title}
                  className="h-40 w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200";
                  }}
                />

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Title: {course.title}
                    <br />
                    CourseId: {course.courseid}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    Description: {course.description}
                  </p>

                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Category: {course.category}</span>
                    <span>Level: {course.level}</span>
                  </div>

                  <p className="mt-2 font-semibold text-blue-600">
                    Course Price: ₹{course.courseprice}
                  </p>

                  <p className="text-xs text-gray-400">
                    Instructor: {course.instructorid}
                  </p>

                  <button
                    onClick={() => navigate("/enrollcours")}
                    className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------- CARD ----------------
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

export default Studentdash;
