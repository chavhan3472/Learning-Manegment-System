import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ViewSingalcourseintsructor() {
  const { courseid } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [studentsCount, setStudentsCount] = useState(0);

  useEffect(() => {
    fetchCourse();
    fetchStudents();
  }, [courseid]);
  const fetchCourse = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/getsindalcourse/${courseid}`,
      );
      setCourse(res.data?.course || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/viewenrollment/${courseid}`,
      );

      setStudentsCount(res.data.count || 0);
    } catch (err) {
      console.log(err);
    }
  };

  if (!course) {
    return <div className="p-5 text-center">Loading Course...</div>;
  }

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-5">
        {/* Image */}
        <img
          src={`http://localhost:5000/courseimg/${course.thumbnail}`}
          alt="course"
          className="w-full h-56 object-cover rounded-lg"
        />

        {/* Title */}
        <h1 className="text-2xl font-bold mt-4">{course.title}</h1>

        {/* Description */}
        <p className="text-gray-600 mt-2">{course.description}</p>

        {/* Course Info */}
        <div className="mt-3 flex flex-wrap gap-4 text-sm items-center">
          <p>📚 Category: {course.category}</p>
          <p>💰 Price: ₹{course.courseprice}</p>
          <p>📊 Level: {course.level}</p>
          <p>📊 CourseId: {course.courseid}</p>

          {/* Students Count + Button */}
          <div className="flex items-center gap-3">
            <p>👨‍🎓 Students: {studentsCount}</p>

            <button
              onClick={() => navigate(`/viewstudentsenroll/${courseid}`)}
              className="bg-purple-500 text-white px-3 py-1 rounded text-xs hover:bg-purple-600"
            >
              View Students
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-3 flex-wrap">
          {/* Create Assignment */}
          <button
            onClick={() => navigate(`/createassgiment/${courseid}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Assignment
          </button>

          {/* View Assignment */}
          <button
            onClick={() => navigate(`/viewassigment/${courseid}`)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            View Assignments
          </button>

          {/* Student Assignments */}
          <button
            onClick={() => navigate(`/viewassigment/${courseid}`)}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            View Student Progress
          </button>
        </div>

        {/* Lectures */}
        <h2 className="text-xl font-semibold mt-6">Lectures</h2>

        {course.lectures?.length > 0 ? (
          <ul className="mt-3 space-y-3">
            {course.lectures.map((lec, index) => (
              <li
                key={index}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <span className="font-medium">{lec.title}</span>

                <a
                  href={lec.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  ▶ Watch
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No lectures available</p>
        )}
      </div>
    </div>
  );
}

export default ViewSingalcourseintsructor;
