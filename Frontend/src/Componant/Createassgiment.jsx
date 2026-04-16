import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Createassgiment() {
  const { courseid } = useParams(); // course id auto milega
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    assigmentid: "",
    courseid: courseid,
    title: "",
    description: "",
    dueDate: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/createassigment", formData);

      alert("Assignment Created Successfully ✅");

      // Redirect
      navigate("/viewcourseins");
    } catch (err) {
      console.log(err);
      alert("Failed to create assignment ❌");
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">📘 Create Assignment</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Assignment ID */}
          <input
            type="text"
            name="assigmentid"
            placeholder="Assignment ID"
            value={formData.assigmentid}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Assignment Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Assignment Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />

          {/* Due Date */}
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Assignment
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Createassgiment;
