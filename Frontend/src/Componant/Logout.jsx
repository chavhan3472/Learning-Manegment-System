import React, { useContext, useEffect } from "react";
import Ct from "./Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Logout() {
  let obj = useContext(Ct);
  let navigate = useNavigate();
  useEffect(() => {
    obj.updfun({
      user_name: "",
      user_email: "",
      token: "",
      role: "",
    });
    Cookies.remove("login_data");
    navigate("/");
  }, []);
  return (
    <div>
      <h1>This The Logout</h1>
    </div>
  );
}

export default Logout;
