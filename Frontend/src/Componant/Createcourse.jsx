import React, { useContext, useState, useEffect } from "react";
import Ct from "./Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Createcourse() {
  let [data, updDate] = useState({
    courseid: "",
    title: "",
    description: "",
    instructorid: "",
    category: "",
    courseprice: "",
    level: "",
    lectures: [],
    thumbnail: "",
  });

  let [lecture, setLecture] = useState({
    title: "",
    video: "",
  });

  let [message, setMessage] = useState("");

  let navigate = useNavigate();
  let obj = useContext(Ct);

  useEffect(() => {
    let getcookes = Cookies.get("login_data");

    if (!getcookes) {
      navigate("/");
    } else {
      let user = JSON.parse(getcookes);
      obj.updfun(user);

      updDate((prev) => ({
        ...prev,
        instructorid: user.user_email,
      }));
    }
  }, []);

  let handleChange = (e) => {
    updDate({ ...data, [e.target.name]: e.target.value });
  };

  let handleLectureChange = (e) => {
    setLecture({ ...lecture, [e.target.name]: e.target.value });
  };

  // 🔥 FIXED LINK VALIDATION
  let addLecture = () => {
    if (!lecture.title || !lecture.video) return;

    if (!lecture.video.startsWith("http")) {
      alert("Please enter valid video URL");
      return;
    }

    updDate({
      ...data,
      lectures: [...data.lectures, lecture],
    });

    setLecture({ title: "", video: "" });
  };

  let sendcourse = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();

      // 🔥 FIXED IMAGE + DATA HANDLING
      Object.keys(data).forEach((key) => {
        if (key === "lectures") {
          formData.append(key, JSON.stringify(data[key]));
        } else if (key === "thumbnail") {
          formData.append("thumbnail", data.thumbnail); // ✅ IMAGE FIX
        } else {
          formData.append(key, data[key]);
        }
      });

      await axios.post("http://localhost:5000/createcourse", formData);

      setMessage("Course Submitted Successfully ✅");

      updDate({
        courseid: "",
        title: "",
        description: "",
        instructorid: data.instructorid,
        category: "",
        courseprice: "",
        level: "",
        lectures: [],
        thumbnail: "",
      });
    } catch (err) {
      console.log(err);
      setMessage("Error submitting course ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          🎓 Create Course
        </h1>

        <p className="text-gray-500 mb-6">Welcome, {obj.state.user_name}</p>

        {message && (
          <p className="text-center text-sm mb-4 text-green-600 font-medium">
            {message}
          </p>
        )}

        <form onSubmit={sendcourse} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="courseid"
              value={data.courseid}
              onChange={handleChange}
              placeholder="Course ID"
              className="input"
            />

            <input
              name="courseprice"
              value={data.courseprice}
              onChange={handleChange}
              type="number"
              placeholder="Price ₹"
              className="input"
            />
          </div>

          <input
            name="title"
            value={data.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="input"
          />

          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Course Description"
            className="input h-24"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="category"
              value={data.category}
              onChange={handleChange}
              placeholder="Category"
              className="input"
            />

            <select
              name="level"
              value={data.level}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Upload Thumbnail</label>

            <input
              type="file"
              onChange={(e) =>
                updDate({
                  ...data,
                  thumbnail: e.target.files[0], // ✅ FIX
                })
              }
              className="mt-1 w-full"
            />
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <h2 className="font-semibold mb-3 text-gray-700">📚 Add Lecture</h2>

            <input
              name="title"
              value={lecture.title}
              onChange={handleLectureChange}
              placeholder="Lecture Title"
              className="input mb-2"
            />

            <input
              name="video"
              value={lecture.video}
              onChange={handleLectureChange}
              placeholder="Video URL"
              className="input mb-2"
            />

            <button
              type="button"
              onClick={addLecture}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg text-sm"
            >
              + Add Lecture
            </button>

            <div className="mt-3 space-y-1 text-sm">
              {data.lectures.map((l, i) => (
                <div key={i} className="bg-white p-2 rounded shadow-sm">
                  {i + 1}. {l.title}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl font-semibold">
              🚀 Create Course
            </button>

            <button
              type="button"
              onClick={() => navigate("/instructordash")}
              className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-xl font-semibold"
            >
              ⬅ Back
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #e5e7eb;
            padding: 10px;
            border-radius: 10px;
            outline: none;
            transition: 0.2s;
          }
          .input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
          }
        `}
      </style>
    </div>
  );
}

export default Createcourse;
