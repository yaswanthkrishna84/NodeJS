const express = require("express");
const router = express.Router();
const student = require("../models/marks");
var mongo = require("mongodb");
const marks = require("../models/marks");
//1-CreateStudent
router.post("/createStudent", (req, res) => {
  const userData = req.body;
  const db = new marks();
  db.stuName = userData.stuName;
  db.stuNo = userData.stuNo;
  db.mobileNumber = userData.mobileNumber;
  db.addr = userData.addr;
  db.m1 = userData.m1;
  db.m2 = userData.m2;
  db.m3 = userData.m3;
  db.m4 = userData.m4;
  db.m5 = userData.m5;
  db.m6 = userData.m6;
  //   console.log(userData);
  db.total =
    parseInt(db.m1) +
    parseInt(db.m2) +
    parseInt(db.m3) +
    parseInt(db.m4) +
    parseInt(db.m5) +
    parseInt(db.m6);
  db.avg = parseInt(db.total) / 6;
  if (db.avg >= 90) {
    db.grade = "A";
  } else if (db.avg >= 80) {
    db.grade = "B";
  } else if (db.avg >= 70) {
    db.grade = "C";
  } else if (db.avg >= 60) {
    db.grade = "D";
  } else if (db.avg >= 50) {
    db.grade = "E";
  } else {
    db.grade = "F";
  }
  db.percent = db.avg + "%";
  db.save(function (err, userFound) {
    if (err) {
      response = { success: false, msg: err };
      res.json(response);
    } else {
      response = { success: true, msg: "successfully student regiseter" };
      res.json(response);
    }
  });
});
//2-GetAllStudents
router.get("/getStudents", (req, res) => {
  const db = marks;
  db.find({}, function (err, userDetails) {
    if (err) {
      response = { success: false, status: "fail" };
      res.json(response);
    } else {
      if (userDetails && userDetails.length > 0) {
        res.json({ success: true, data: userDetails });
      } else {
        res.json({ success: false, msg: "Student details not found" });
      }
    }
  });
});
//3-Delete By Student Number
router.delete("/deleteStudentById/:stuNo", (req, res) => {
  try {
    const stuNo = req.params.stuNo;
    const db = marks;
    db.deleteOne({ stuNo: stuNo }, function (err, data) {
      if (err) {
        response = { success: false, status: "fail" };
        res.json(response);
      } else {
        if (err) {
          response = { success: false, msg: err };
        } else {
          response = {
            success: true,
            msg: "Student deleted successfully.:" + stuNo,
          };
        }
        res.json(response);
      }
    });
  } catch (e) {
    console.log(e);
    response = { success: false, msg: "Problem while sending the data" };
    res.json(response);
  }
});
//4-Update Student Details
router.put("/updateStudent", (req, res) => {
  const studentDetails = req.body;
  const id = studentDetails.id;
  const db = marks;
  const update_data = { $set: {} };
  update_data.$set["stuName"] = studentDetails.stuName;
  update_data.$set["stuNo"] = studentDetails.stuNo;
  update_data.$set["mobileNumber"] = studentDetails.mobileNumber;
  update_data.$set["addr"] = studentDetails.addr;
  update_data.$set["m1"] = studentDetails.m1;
  update_data.$set["m2"] = studentDetails.m2;
  update_data.$set["m3"] = studentDetails.m3;
  update_data.$set["m4"] = studentDetails.m4;
  update_data.$set["m5"] = studentDetails.m5;
  update_data.$set["m6"] = studentDetails.m6;
  update_total =
    parseInt(studentDetails.m1) +
    parseInt(studentDetails.m2) +
    parseInt(studentDetails.m3) +
    parseInt(studentDetails.m4) +
    parseInt(studentDetails.m5) +
    parseInt(studentDetails.m6);
  update_data.$set["total"] = update_total;
  update_avg = update_total / 6;
  update_data.$set["avg"] = update_avg;
  if (update_avg >= 90) {
    update_data.$set["grade"] = "A";
  } else if (update_avg >= 80) {
    update_data.$set["grade"] = "B";
  } else if (update_avg >= 70) {
    update_data.$set["grade"] = "C";
  } else if (update_avg >= 60) {
    update_data.$set["grade"] = "D";
  } else if (update_avg >= 50) {
    update_data.$set["grade"] = "E";
  } else {
    update_data.$set["grade"] = "F";
  }
  update_data.$set["percent"] = update_avg + "%";
  console.log(studentDetails);
  db.aggregate(
    [
      {
        $match: { _id: mongo.ObjectID(id) },
      },
    ],
    function (err, data) {
      if (err) {
        response = { success: false, status: "fail" };
        res.json(response);
      } else {
        if (data && data.length > 0) {
          db.updateOne(
            { _id: mongo.ObjectID(id) },
            update_data,
            function (err) {
              if (err) {
                response = { success: false, msg: err };
              } else {
                response = {
                  success: true,
                  msg: "Student updated successfully",
                };
              }
              res.json(response);
            }
          );
        } else {
          res.send({ success: false, msg: "Student id not found" });
        }
      }
    }
  );
});
module.exports = router;
