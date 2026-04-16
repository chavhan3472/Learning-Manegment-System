import React, { useContext, useEffect, useState } from "react";
import Ct from "./Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Enrollcourse() {
  const obj = useContext(Ct);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    student_name: "",
    user_email: "",
    courseid: "",
    course_name: "",
    note: "",
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const cookie = Cookies.get("login_data");

    if (!cookie) {
      navigate("/");
      return;
    }

    const user = JSON.parse(cookie);

    // update context (optional)
    obj.updfun(user);

    // set initial values ONLY ONCE
    setForm({
      student_name: user.name || "",
      user_email: user.email || "",
      courseid: "",
      course_name: "",
      note: "",
    });
  }, []);

  // Handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.student_name ||
      !form.user_email ||
      !form.courseid ||
      !form.course_name
    ) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/enrollcourse", form);

      alert("🎉 Enrolled Successfully!");
      navigate("/studentdash");
    } catch (err) {
      console.log(err);
      alert("❌ Enrollment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-6 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-bold mb-4 text-center">
            🎓 Enroll Course
          </h2>

          <input
            name="student_name"
            value={form.student_name}
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="w-full p-2 mb-3 border rounded"
          />

          <input
            name="user_email"
            value={form.user_email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            className="w-full p-2 mb-3 border rounded"
          />

          <input
            name="courseid"
            value={form.courseid}
            onChange={handleChange}
            placeholder="Enter Course ID"
            className="w-full p-2 mb-3 border rounded"
          />

          <input
            name="course_name"
            value={form.course_name}
            onChange={handleChange}
            placeholder="Enter Course Name"
            className="w-full p-2 mb-3 border rounded"
          />

          <input
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Any note (optional)"
            className="w-full p-2 mb-4 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Enrolling..." : "Confirm Enrollment"}
          </button>
        </form>
      </div>

      <footer className="bg-black text-gray-300 text-center py-3 text-sm">
        © 2026 LMS Platform • Learn • Build • Grow 🚀
      </footer>
    </div>
  );
}

export default Enrollcourse;
