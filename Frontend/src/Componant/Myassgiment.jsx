import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function Myassgiment() {
  const navigate = useNavigate();
  const { courseid } = useParams();

  const user = JSON.parse(Cookies.get("login_data") || "{}");
  const user_email = user?.user_email;

  const [submitted, setSubmitted] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    if (!user_email) return navigate("/");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [assRes, subRes] = await Promise.all([
        axios.get(`http://localhost:5000/getassigment/${courseid}`),
        axios.get(
          `http://localhost:5000/getstudentsubmission/${user_email}/${courseid}`,
        ),
      ]);
      console.log(assRes.data.data, "This The Data");
      console.log(subRes.data.data, "This The subRes");
      const assignments = assRes.data.data || [];
      const submissions = subRes.data.data || [];
      const submissionMap = new Map();
      submissions.forEach((s) => {
        submissionMap.set(s.assigmentid, s);
      });

      const submittedList = [];
      const pendingList = [];

      assignments.forEach((a) => {
        const sub = submissionMap.get(a.assigmentid);

        if (sub) {
          submittedList.push({
            ...a,
            status: "submitted",
            marks: sub.marks,
            feedback: sub.feedback,
          });
        } else {
          pendingList.push({
            ...a,
            status: "pending",
          });
        }
      });

      setSubmitted(submittedList);
      setPending(pendingList);
    } catch (err) {
      console.log(err);
    }
  };

  const Card = ({ item }) => (
    <div className="bg-white p-4 mb-3 rounded shadow">
      <p>
        <b>Assignment ID:</b> {item.assigmentid}
      </p>
      <p>
        <b>Course ID:</b> {item.courseid}
      </p>
      <p>
        <b>Title:</b> {item.title}
      </p>
      <p>
        <b>Description:</b> {item.description}
      </p>
      <p>
        <b>Due Date:</b> {new Date(item.dueDate).toLocaleDateString()}
      </p>

      <p>
        Status:{" "}
        <span
          className={
            item.status === "pending" ? "text-red-500" : "text-green-600"
          }
        >
          {item.status}
        </span>
      </p>

      {item.status === "pending" && (
        <button
          onClick={() =>
            navigate(`/writeassignment/${item.assigmentid}/${item.courseid}`)
          }
          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
        >
          Submit Assignment
        </button>
      )}
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate("/mycourse")}
        className="mb-4 bg-gray-700 text-white px-3 py-1 rounded"
      >
        ⬅ Back
      </button>

      <h2 className="text-2xl font-bold mb-4">📚 My Assignments</h2>

      {/* Pending */}
      <h3 className="text-xl font-semibold text-red-500 mb-2">
        Pending Assignments
      </h3>

      {pending.length === 0 ? (
        <p>No pending assignments</p>
      ) : (
        pending.map((item) => <Card key={item._id} item={item} />)
      )}
      <h3 className="text-xl font-semibold text-green-600 mt-6 mb-2">
        Submitted Assignments
      </h3>

      {submitted.length === 0 ? (
        <p>No submitted assignments</p>
      ) : (
        submitted.map((item) => <Card key={item._id} item={item} />)
      )}
    </div>
  );
}

export default Myassgiment;
