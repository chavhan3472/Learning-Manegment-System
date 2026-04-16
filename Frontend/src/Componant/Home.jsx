import React, { useContext, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/heroimg.png";
import main from "../assets/main.png";
import web from "../assets/webdevlopment.png";
import data from "../assets/Datascience.png";
import graphics from "../assets/Graphics.png";
import Digital from "../assets/Digitalmarketing.png";
import Cookies from "js-cookie";
import Ct from "./Context";
function Home() {
  let obj = useContext(Ct);
  let navigate = useNavigate();
  useEffect(() => {
    let getcookes = Cookies.get("login_data");
    if (!getcookes) {
      navigate("/");
    } else {
      let user = JSON.parse(getcookes);
      if (user.role === "user") {
        navigate("/studentdash");
      } else if (user.role === "admin") {
        navigate("/instructordash");
      } else {
        console.log("Ok");
      }
    }
  }, []);
  let clickfunction = () => {
    navigate("/login");
  };
  return (
    <div className="w-full min-h-screen bg-[#f5f7fb]">
      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        {/* LEFT */}
        <div className="md:w-1/2 space-y-6">
          <p className="text-sm text-gray-400">Best online learning platform</p>

          <h2 className="text-5xl font-bold text-gray-800 leading-tight">
            Unlock Your <br />
            Potential with <br />
            <span className="text-orange-500">Our Online</span>{" "}
            <span className="text-indigo-600">Courses</span>
          </h2>

          <p className="text-gray-500 text-lg">
            Learn new skills online from top instructors
          </p>

          <div className="flex gap-4">
            <button
              onClick={clickfunction}
              className="px-6 py-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600"
            >
              Get Started
            </button>

            <button
              onClick={clickfunction}
              className="px-6 py-3 bg-gray-200 rounded-full shadow-sm"
            >
              Browse Courses
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img src={main} className="w-[480px] h-[20rem] " />
        </div>
      </section>

      {/* COURSES */}
      <section className="px-10 py-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          Explore Our Courses
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              title: "Web Development",
              img: web,
            },
            {
              title: "Data Science",
              img: data,
            },
            {
              title: "Graphic Design",
              img: graphics,
            },
            {
              title: "Digital Marketing",
              img: Digital,
            },
          ].map((course, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition"
            >
              {/* IMAGE */}
              <img
                src={course.img}
                alt={course.title}
                className="h-32 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Learn professional skills with real projects
                </p>

                <button
                  className="mt-4 text-indigo-600 font-medium"
                  onClick={clickfunction}
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="px-10 py-16 flex flex-col md:flex-row items-center">
        {/* LEFT */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold">Why Choose Us?</h2>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-orange-100 p-3 rounded-lg">🔥</div>
              <div>
                <h3 className="font-semibold">Expert Instructors</h3>
                <p className="text-gray-500 text-sm">
                  Learn from industry experts
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 p-3 rounded-lg">⏰</div>
              <div>
                <h3 className="font-semibold">Flexible Learning</h3>
                <p className="text-gray-500 text-sm">Study anytime anywhere</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-green-100 p-3 rounded-lg">📜</div>
              <div>
                <h3 className="font-semibold">Certificate</h3>
                <p className="text-gray-500 text-sm">
                  Get certified after completion
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img src={heroImg} className="w-[420px]" />
        </div>
      </section>

      {/* CTA */}
      <section className="px-10 py-16 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-center rounded-t-[50px]">
        <h2 className="text-3xl font-bold">
          Join Thousands of Learners Today!
        </h2>

        <p className="mt-3 text-gray-200">
          Start your learning journey and upgrade your skills.
        </p>

        <button
          onClick={clickfunction}
          className="mt-6 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full"
        >
          Get Started
        </button>
      </section>
    </div>
  );
}

export default Home;
