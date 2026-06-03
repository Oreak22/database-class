const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/user.model");
const port = 3000;
const dbURL =
  "mongodb+srv://<username>:<add_password>@cluster0.lvt57qr.mongodb.net/?appName=Cluster0";

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/submit", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // creating a new instance of the userModel and passing the request body to it. this will create a new document in the students collection with the data from the request body.
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

app.get("/table", async (req, res) => {
  try {
    // using .find without a query will return all documents in the collection and will return an array of objects. with a query, it will return an array of objects that match the query.
    const students = await userModel.find();

    console.log(students);
    res.render("table", { students });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getone", async (req, res) => {
  try {
    res.render("viewone", { student: null });
  } catch (err) {
    console.log(err);
  }
});

app.post("/getone", async (req, res) => {
  try {
    // using .findOne with a query will return the first document that matches the query and will return an object. without a query, it will return the first document in the collection.
    const student = await userModel.findOne({
      email: req.body.email,
    });
    res.render("viewone", { student });
  } catch (err) {
    console.log(err);
  }
});

app.get("/edit", (req, res) => {
  res.render("edit");
});

app.post("/edited", async (req, res) => {
  // console.log(req.body);
  // res.render("table");
  try {
    // using .findOneAndUpdate with a query will return the first document that matches the query and will update it with the new data. without a query, it will return the first document in the collection and will update it with the new data.
    const editStudent = await userModel.findOneAndUpdate(
      { email: req.body.formerEmail },
      { email: req.body.newEmail },
    );
    console.log(editStudent);
    res.redirect("/table");
  } catch (err) {
    console.log(err);
  }
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

// assignment: create a new route for deleting a student and then use .findOneAndDelete to delete the student from the collection and then redirect to the table page to see the updated list of students.
// 2. find out more way to query the database and try to implement them in the app. for example, you can use .findByIdAndUpdate to update a student by their id or .findByIdAndDelete to delete a student by their id. you can also use .countDocuments to count the number of documents in the collection or .distinct to get the distinct values of a field in the collection.
