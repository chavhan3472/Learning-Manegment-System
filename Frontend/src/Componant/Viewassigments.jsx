import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Viewassigments() {
  const { courseid } = useParams();
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, [courseid]);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/getassigment/${courseid}`,
      );
      console.log(courseid, "This The CourseId");
      console.log(res.data.data, "This The Backend Data");
      setAssignments(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteAssignment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteassigment/${id}`);
      setAssignments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-5">
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-4">📘 Course Assignments</h1>

        {assignments.length > 0 ? (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Assignment ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Due Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((a, i) => (
                <tr key={a._id} className="text-center">
                  <td className="p-2 border">{i + 1}</td>

                  <td className="p-2 border">{a.assigmentid}</td>
                  <td className="p-2 border">{a.title}</td>
                  <td className="p-2 border">{a.description}</td>

                  <td className="p-2 border">
                    {new Date(a.dueDate).toLocaleDateString()}
                  </td>

                  <td className="p-2 border flex justify-center gap-3">
                    {/* View */}
                    <button
                      onClick={() =>
                        navigate(`/report/${a.assigmentid}/${courseid}`)
                      }
                      className="text-blue-500 hover:underline"
                    >
                      📊 Report
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteAssignment(a._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center">No assignments found</p>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-5 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}

export default Viewassigments;
