import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import Ct from "./Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Viewmycourseinstructor() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const obj = useContext(Ct);
  const navigate = useNavigate();

  useEffect(() => {
    const getcookes = Cookies.get("login_data");

    if (!getcookes) {
      navigate("/");
    } else {
      const user = JSON.parse(getcookes);
      obj.updfun(user);

      fetchCourses(user.user_email);
    }
  }, []);

  const fetchCourses = async (email) => {
    try {
      const res = await axios.get(`http://localhost:5000/mycourses/${email}`);
      console.log(res.data, "This The Data");
      setCourses(res.data);
      console.log(res.data, "This The Res Data");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delatecourse/${id}`);
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 text-white">
        <h1 className="text-2xl font-bold">🎓 My Courses</h1>
        <button
          onClick={() => navigate("/instructordash")}
          className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-200"
        >
          ⬅ Back
        </button>
        <button
          onClick={() => navigate("/createcourse")}
          className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-200"
        >
          + Create Course
        </button>
      </div>

      {/* Content Box */}
      <div className="bg-white/90 backdrop-blur-lg p-6 rounded-3xl shadow-xl">
        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading courses...</p>
        )}
        {!loading && courses.length === 0 && (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-700">
              No Courses Yet 😔
            </h2>

            <button
              onClick={() => navigate("/createcourse")}
              className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700"
            >
              Create Course
            </button>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                {course.thumbnail ? (
                  <img
                    src={`http://localhost:5000/courseimg/${course.thumbnail}`}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="font-bold text-lg text-gray-800">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                    {course.level}
                  </span>

                  <span className="font-semibold text-gray-700">
                    ₹ {course.courseprice}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() =>
                      navigate(`/viewsinaglcoursein/${course.courseid}`)
                    }
                    className="w-full bg-indigo-600 text-white py-1 rounded-lg hover:bg-indigo-700"
                  >
                    View
                  </button>

                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="w-full bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Viewmycourseinstructor;
