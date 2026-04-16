import React from "react";
import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Login() {
  let navigate = useNavigate();
  let [msg, UpdMsg] = useState("Welcome Back 👋");
  let [data, updData] = useState({ user_email: "", user_pasword: "" });
  let fun2 = (e) => {
    updData({ ...data, [e.target.name]: e.target.value });
  };
  let sublogin = () => {
    axios
      .post("http://localhost:5000/userlogin", data)
      .then((res) => {
        if (res.data.token === undefined) {
          UpdMsg(res.data.msg);
        } else {
          Cookies.set("login_data", JSON.stringify(res.data), { expires: 3 });
          if (res.data.role === "user") {
            navigate("/studentdash");
          } else if (res.data.role === "admin") {
            navigate("/instructordash");
          } else {
            console.log("Nothing");
          }
        }
      })
      .catch((error) => {
        UpdMsg(res.data.msg);
        console.log(error);
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      {/* Login Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {msg}
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to continue
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Your Email"
            value={data.user_email}
            name="user_email"
            onChange={fun2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            placeholder="Enter Your Password"
            value={data.user_pasword}
            name="user_pasword"
            onChange={fun2}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            onClick={sublogin}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
          >
            Login
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-5">
          Don’t have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-500 cursor-pointer ml-1"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
export default Login;
