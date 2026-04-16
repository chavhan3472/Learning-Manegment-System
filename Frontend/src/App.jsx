import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Componant/Home";
import Register from "./Componant/Register";
import Nav from "./Componant/Nav";
import Login from "./Componant/Login";
import "./App.css";
import Studentdash from "./Componant/Studentdash";
import Instructordash from "./Componant/Instructordash";
import Cookies from "js-cookie";
import Ct from "./Componant/Context";
import Logout from "./Componant/Logout";
import Createcourse from "./Componant/Createcourse";
import Viewmycourseinstructor from "./Componant/Viewmycourseinstructor";
import ViewSingalcourseintsructor from "./Componant/ViewSingalcourseintsructor";
import ViewStudents from "./Componant/ViewStudents";
import Createassgiment from "./Componant/Createassgiment";
import Viewassigments from "./Componant/Viewassigments";
import ViewSubmiitedAndunsubmmitedass from "./Componant/ViewSubmiitedAndunsubmmitedass";
import StudentAssignments from "./Componant/StudentAssignments";
import Enrollcourse from "./Componant/Enrollcourse";
import Mycourse from "./Componant/Mycourse";
import Myassgiment from "./Componant/Myassgiment";
import Writeassgiment from "./Componant/Writeassgiment";
import MyAssignments from "./Componant/MyAssignments";
import Profile from "./Componant/Profile";
function App() {
  let [state, updState] = useState({
    user_name: "",
    user_email: "",
    token: "",
    role: "",
  });
  let updfun = (obj) => {
    updState({ ...state, ...obj });
  };
  let obj = { state: state, updfun: updfun };
  return (
    <BrowserRouter>
      <Ct.Provider value={obj}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentdash" element={<Studentdash />} />
          <Route path="/instructordash" element={<Instructordash />} />
          <Route path="/createcourse" element={<Createcourse />} />
          <Route path="/viewcourseins" element={<Viewmycourseinstructor />} />
          <Route
            path="/viewsinaglcoursein/:courseid"
            element={<ViewSingalcourseintsructor />}
          />
          <Route
            path="/viewstudentsenroll/:courseid"
            element={<ViewStudents />}
          />
          <Route
            path="/createassgiment/:courseid"
            element={<Createassgiment />}
          />
          <Route path="/viewassigment/:courseid" element={<Viewassigments />} />
          <Route
            path="/student-assignments/:user_email/:courseid"
            element={<StudentAssignments />} // For Singal Student Record
          />
          <Route
            path="/report/:assigmentid/:courseid"
            element={<ViewSubmiitedAndunsubmmitedass />}
          />
          <Route path="/enrollcours" element={<Enrollcourse />} />
          <Route path="/mycourse" element={<Mycourse />} /> // For Student View
          Dashbaord
          <Route path="/myassignment/:courseid" element={<Myassgiment />} /> //
          This The Student Assigmnet
          <Route
            path="/writeassignment/:assigmentid/:courseid"
            element={<Writeassgiment />}
          />
          <Route
            path="/myassignments/:user_email"
            element={<MyAssignments />} /// for multiple  assgiment
          />
          <Route
            path="/profile"
            element={<Profile />} /// for multiple  assgiment
          />{" "}
          /// for profile seen // Write Assigment
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Ct.Provider>
    </BrowserRouter>
  );
}
export default App;
