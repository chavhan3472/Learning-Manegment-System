import React, { useContext } from "react";
import Ct from "./Context";
import { useNavigate } from "react-router-dom";

function Profile() {
  const obj = useContext(Ct);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-2xl">
        {/* HEADER CARD */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold">👤 Student Profile</h2>
          <p className="text-sm opacity-80">Manage your account details</p>
        </div>
        <div className="bg-white mt-4 p-6 rounded-xl shadow">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
              {obj.state.user_name?.charAt(0)}
            </div>

            <div>
              <h3 className="text-xl font-semibold">{obj.state.user_name}</h3>
              <p className="text-gray-500">{obj.state.user_email}</p>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold">Student</p>
            </div>

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">Account Status</p>
              <p className="font-semibold text-green-600">Active</p>
            </div>

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">Joined</p>
              <p className="font-semibold">2026</p>
            </div>

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">Plan</p>
              <p className="font-semibold text-blue-600">Free LMS User</p>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate("/studentdash")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ⬅ Dashboard
            </button>

            <button
              onClick={() => alert("Feature coming soon 🚀")}
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-gray-500 text-sm mt-6">
          © 2026 LMS Platform | Built with MERN Stack ⚡
        </div>
      </div>
    </div>
  );
}

export default Profile;
