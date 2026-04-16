import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import Ct from "./Context";
import Cookies from "js-cookie";

function Nav() {
  let navigate = useNavigate();
  let obj = useContext(Ct);
  useEffect(() => {
    let getcookes = Cookies.get("login_data");
    if (!getcookes) {
      navigate("/");
    } else {
      let user = JSON.parse(getcookes);
      obj.updfun(user);
    }
  }, []);
  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600 tracking-wide">
          EduPlatform
        </h1>

        <div className="flex gap-8 text-gray-600 font-medium">
          {obj.state.token === "" ? (
            <>
              <Link
                to="/"
                className="hover:text-indigo-600 transition duration-200"
              >
                Home
              </Link>

              <Link
                to="/register"
                className="hover:text-indigo-600 transition duration-200"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="hover:text-indigo-600 transition duration-200"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {obj.state.role === "user" ? (
                <Link
                  to="/studentdash"
                  className="hover:text-indigo-600 transition duration-200"
                ></Link> /// this is for student dashboard
              ) : obj.state.role === "admin" ? (
                <Link
                  to="/instructordash"
                  className="hover:text-indigo-600 transition duration-200"
                ></Link>
              ) : null}
              {obj.state.token && (
                <Link
                  to="/logout"
                  className="hover:text-red-600 transition duration-200"
                >
                  Logout
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Nav;
