import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function MyAssignments() {
  const { user_email } = useParams();
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [submittedIds, setSubmittedIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // enrolled courses ke assignments
      const enrollRes = await axios.get(
        `http://localhost:5000/studentenroll/${user_email}`,
      );

      const enrollments = enrollRes.data || [];

      let allAssignments = [];

      for (let course of enrollments) {
        const res = await axios.get(
          `http://localhost:5000/getassigment/${course.courseid}`,
        );
        allAssignments = [...allAssignments, ...res.data.data];
      }

      setAssignments(allAssignments);

      // submissions
      const subRes = await axios.get(
        `http://localhost:5000/getstudentsubmission/${user_email}`,
      );

      const subIds = subRes.data.data.map((s) => s.assigmentid);
      setSubmittedIds(subIds);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => navigate("/studentdash")}
        className="mb-4 bg-gray-700 text-white px-3 py-1 rounded"
      >
        ⬅ Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold mb-4">📚 My Assignments</h2>

      <p className="mb-4 text-gray-600">User: {user_email}</p>

      {/* ASSIGNMENTS LIST */}
      {assignments.length === 0 ? (
        <p>No assignments found</p>
      ) : (
        assignments.map((item) => {
          const isSubmitted = submittedIds.includes(item.assigmentid);

          return (
            <div key={item._id} className="bg-white p-4 mb-3 rounded shadow">
              <p>
                <b>Title:</b> {item.title}
              </p>
              <p>
                <b>Description:</b> {item.description}
              </p>
              <p>
                <b>Course:</b> {item.courseid}
              </p>
              <p>
                <b>Due Date:</b> {item.dueDate}
              </p>

              <p>
                Status:{" "}
                <span
                  className={isSubmitted ? "text-green-600" : "text-red-500"}
                >
                  {isSubmitted ? "Submitted" : "Pending"}
                </span>
              </p>

              {/* SUBMIT BUTTON */}
              {!isSubmitted && (
                <button
                  onClick={() =>
                    navigate(
                      `/writeassignment/${item.assigmentid}/${item.courseid}`,
                    )
                  }
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Submit Assignment
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
export default MyAssignments;
