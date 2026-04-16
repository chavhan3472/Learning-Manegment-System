const user_model = require("../model/usermodel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let user_registartion = async (req, res) => {
  try {
    let obj = await user_model.findOne({ user_email: req.body.user_email });
    if (obj) {
      res.json({ msg: "User Alredy Exist" });
    } else {
      // Thired Componant
      let securepassword = await bcrypt.hash(req.body.user_pasword, 10);
      let data = new user_model({ ...req.body, user_pasword: securepassword });
      await data.save();
      res.json({ msg: "Account Created Suceffully" });
    }
  } catch (error) {
    console.log(error, "This Is The error");
    res.json({ ms: "Failed To Registation" });
  }
};
let user_login = async (req, res) => {
  try {
    let obj = await user_model.findOne({ user_email: req.body.user_email });
    if (obj) {
      let ismatch = await bcrypt.compare(
        req.body.user_pasword,
        obj.user_pasword,
      );
      if (ismatch) {
        res.json({
          token: jwt.sign({ user_email: obj.user_email }, "1234"),
          role: obj.role,
          user_name: obj.user_name,
          user_email: obj.user_email,
        });
      } else {
        res.json({ msg: "Invalid Password" });
      }
    } else {
      res.json({ msg: "Invalid Email" });
    }
  } catch (error) {
    console.log(error, "This Is The error");
    res.json({ ms: "Failed To Login" });
  }
};

module.exports = { user_registartion, user_login };
