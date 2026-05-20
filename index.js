const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/user.model");
const port = 3000;
const dbURL =
  "mongodb+srv://your_db_userName:<your_DBpassword>@cluster0.lvt57qr.mongodb.net/?appName=Cluster0";

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/submit", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const newStudent = new userModel(req.body);

  newStudent
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });

  //   const newStudent = new userModel({
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email,
  //     password: password,
  //   });

  res.render("submit");
});

mongoose
  .connect(dbURL, { dbName: "users" })
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("app is running at port 3000");
});
