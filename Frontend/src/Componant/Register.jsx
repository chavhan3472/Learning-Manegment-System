import React from "react";
import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  let navigate = useNavigate();
  let [msg, updMsg] = useState("Welcome To Learn Mangment System ");
  let [data, updData] = useState({
    user_name: "",
    user_email: "",
    user_phoneno: "",
    user_pasword: "",
  });
  let fun1 = (e) => {
    updData({ ...data, [e.target.name]: e.target.value });
  };
  let submit = () => {
    console.log("Submit Called");
    axios
      .post("http://localhost:5000/userregistartion", data)
      .then((res) => {
        if (res.data.msg === "Account Created Suceffully") {
          updMsg(res.data.msg);
          updData({
            user_name: "",
            user_email: "",
            user_phoneno: "",
            user_pasword: "",
          });
          setTimeout(() => {
            updMsg("Loading...");
            navigate("/login");
          }, 3000);
        } else {
          updMsg(res.data.msg);
          updData({
            user_name: "",
            user_email: "",
            user_phoneno: "",
            user_pasword: "",
          });
        }
      })
      .catch(() => {
        console.log(res.data.msg);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      {/* Register Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create Account ✨
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Register to get started
        </p>
        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={data.user_name}
            name="user_name"
            onChange={fun1}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            placeholder="Enter Your Email"
            value={data.user_email}
            name="user_email"
            onChange={fun1}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            placeholder="Create Password"
            value={data.user_pasword}
            name="user_pasword"
            onChange={fun1}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            placeholder="Enter Your Phone Number"
            value={data.user_phoneno}
            name="user_phoneno"
            onChange={fun1}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={submit}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
          >
            Register
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          Don’t have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-500 cursor-pointer ml-1"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
export default Register;
