import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ViewStudents() {
  const { courseid } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, [courseid]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/viewenrollment/${courseid}`,
      );

      console.log(res.data);
      setStudents(res.data.students || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteenrollment/${id}`);

      setStudents((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-5">
        <h1 className="text-2xl font-bold mb-4">👨‍🎓 Enrolled Students</h1>

        {students.length > 0 ? (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Course</th>
                <th className="p-2 border">Enroll Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, i) => (
                <tr key={s._id} className="text-center">
                  <td className="p-2 border">{i + 1}</td>

                  {/* ✅ Full Data */}
                  <td className="p-2 border">{s.user_email}</td>
                  <td className="p-2 border">{s.course_name}</td>

                  <td className="p-2 border">
                    {new Date(s.enroll_date).toLocaleDateString()}
                  </td>

                  <td className="p-2 border flex justify-center gap-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/student-assignments/${s.user_email}/${courseid}`,
                        )
                      }
                      className="text-blue-500 hover:underline"
                    >
                      View Assignments / hello sahil
                    </button>

                    <button
                      onClick={() => deleteStudent(s._id)}
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
          <p className="text-gray-500">No students enrolled</p>
        )}

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

export default ViewStudents;
