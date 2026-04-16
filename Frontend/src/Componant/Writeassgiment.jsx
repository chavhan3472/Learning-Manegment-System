import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Writeassgiment() {
  const { assigmentid, courseid } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(Cookies.get("login_data") || "{}");
  const user_email = user?.user_email;

  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setMsg("⚠️ Please write answer");
      return;
    }

    if (!fileUrl.trim()) {
      setMsg("⚠️ Please paste link");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/submitfinalassignment", {
        assigmentid,
        courseid,
        user_email,
        submission_text: text,
        file_url: fileUrl,
      });

      setText("");
      setFileUrl("");
      setMsg("🎉 Submitted Successfully");

      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.log(err);
      setMsg("❌ Submission Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">✍️ Write Assignment</h2>

        <button
          onClick={() => navigate("/mycourse")}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          ⬅ Back
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">
        <p className="mb-2">
          <b>Assignment ID:</b> {assigmentid}
        </p>
        <p className="mb-4">
          <b>Course ID:</b> {courseid}
        </p>

        {msg && (
          <p className="text-center mb-3 font-semibold text-green-600">{msg}</p>
        )}

        {/* TEXT ANSWER */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your answer..."
          className="w-full h-32 border p-3 rounded mb-3"
        />

        {/* LINK INPUT */}
        <input
          type="text"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
          placeholder="Paste your Google Drive / GitHub / Any link"
          className="w-full border p-2 rounded mb-4"
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Submitting..." : "Submit Assignment"}
        </button>
      </div>
    </div>
  );
}

export default Writeassgiment;
