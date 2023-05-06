const express = require("express");
const bodyparser = require("body-parser");
var cors = require("cors");

const app = express();

app.use(bodyparser.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyparser.json({ limit: "1000mb" }));
app.use(bodyparser.json());
app.use(cors());

app.use("/public", express.static("public"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST,PUT,OPTIONS,DELETE,GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// const stu = require("./routes/student");
const stu = require("./routes/marks");
var dbConfig = require("./connectiondb.js");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// 1)   Create students
// 2)   Display list of students
// 3)   Search specific student details
// 4)   Delete a student
// 5)   Create Marks Memo
// app.use("/students", stu);
app.use("/marks", stu);
// app.use('/students/createStudent', students);
// app.use('/students/getAllStudents', students);
// app.use('/students/getByStudentID', students);
// app.use('/students/deleteStudent', students);
// app.use('/students/generateMarksMemo', students);
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// app.use('/', users);

app.get("/", function (req, res, next) {
  res.send({ message: "Welcome to Student API application." });
});
const PORT = 2020;
console.log(PORT, "PORT");
app.get("/", function (req, res) {
  console.log("Welcome to Student");
  res.json({ message: "Welcome to Student" });
});

mongoose.connection.on("error", function () {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});
console.log(PORT);
app.listen(PORT, () => {
  console.log("Server is running on PORT ${PORT}");
});
