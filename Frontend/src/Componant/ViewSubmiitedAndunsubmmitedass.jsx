import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ViewSubmiitedAndunsubmmitedass() {
  const { assigmentid, courseid } = useParams();
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState([]);
  const [notSubmitted, setNotSubmitted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res1 = await axios.get(
        `http://localhost:5000/getsubmmitedassgiment/${assigmentid}`,
      );
      console.log(res1.data, "This The Backend Reponse");
      const submittedData = res1.data.data || [];
      setSubmitted(submittedData);

      const res2 = await axios.get(
        `http://localhost:5000/viewenrollment/${courseid}`,
      );

      const enrolled = res2.data.students || [];

      const submittedEmails = submittedData.map((s) => s.student_email);

      const notSub = enrolled.filter(
        (s) => !submittedEmails.includes(s.user_email),
      );

      setNotSubmitted(notSub);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-xl">
        Loading Assignment Report...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        📊 Assignment Report{" "}
        <button
          onClick={() => navigate(-1)}
          className="mt-5 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ⬅ Back
        </button>
      </h1>

      {/* ✅ Submitted */}
      <div className="mb-10">
        <h2 className="text-green-600 font-bold text-xl mb-3">
          ✅ Submitted Students ({submitted.length})
        </h2>

        {submitted.length > 0 ? (
          submitted.map((s) => (
            <div key={s._id} className="p-3 border rounded mb-3 bg-green-50">
              <p>👤 {s.student_email}</p>
              <p>📝 {s.submission_text}</p>
              <p>⭐ Marks: {s.marks || "Not graded"}</p>

              {/* ⭐ NEW BUTTON */}
              <button
                onClick={() =>
                  navigate(`/grade/${assigmentid}/${s.student_email}`)
                }
                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                ⭐ Update Grade
              </button>
            </div>
          ))
        ) : (
          <p>No submissions yet</p>
        )}
      </div>

      {/* ❌ Not Submitted */}
      <div>
        <h2 className="text-red-600 font-bold text-xl mb-3">
          ❌ Not Submitted Students ({notSubmitted.length})
        </h2>

        {notSubmitted.length > 0 ? (
          notSubmitted.map((s) => (
            <div key={s._id} className="p-3 border rounded mb-2 bg-red-50">
              👤 {s.user_email}
            </div>
          ))
        ) : (
          <p>🎉 All students submitted assignment</p>
        )}
      </div>
    </div>
  );
}

export default ViewSubmiitedAndunsubmmitedass;
