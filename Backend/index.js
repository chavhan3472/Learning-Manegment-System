let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const mini_app = require("./router/routes");
mongoose
  .connect(
    "mongodb+srv://sahilchavhan250_db_user:PSTWrj2m0dQWQU28@cluster0.y9kpyzn.mongodb.net/LearningModel",
  )
  .then(() => {
    console.log("Coonection Ok server is run on port Number 5000");
  })
  .catch(() => {
    console.log("Failed to coonect With Database");
  });

let app = express();
app.listen(5000);
app.use(express.json());
app.use("/courseimg", express.static("courseimg"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", mini_app);
