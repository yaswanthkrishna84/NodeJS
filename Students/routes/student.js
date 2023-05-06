const express = require("express");
const router = express.Router();
const student = require("../models/student");
var mongo = require("mongodb");
//Create New Student
router.post("/createStudent", (req, res) => {
  const userData = req.body;
  const db = new student();
  db.firstName = userData.firstName;
  db.lastName = userData.lastName;
  db.email = userData.email;
  db.mobileNumber = userData.mobileNumber;
  db.password = userData.password;

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
//GetAllStudents
router.get("/getStudents", (req, res) => {
  const db = student;
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
//GetStudentsByEmail
router.get("/getStudentById/:email", (req, res) => {
  const id = req.params.email;
  const db = student;
  db.find({ email: id }, function (err, userDetails) {
    if (err) {
      response = { success: false, status: "fail" };
      res.json(response);
    } else {
      if (userDetails && userDetails.length > 0) {
        res.send({ success: true, data: userDetails });
      } else {
        res.send({ success: false, msg: "Student details not found" });
      }
    }
  });
});
//DeleteAllStudents
router.delete("/deleteAllStudents", (req, res) => {
  const db = student;
  db.deleteMany({}, function (err, userDetails) {
    if (err) {
      response = { success: false, status: "fail" };
      res.json(response);
    } else {
      res.json({ success: true, msg: "Student details deleted successfully" });
    }
  });
});
//DeleteStudentByEmail
router.delete("/deleteStudentById/:email", (req, res) => {
  try {
    const stu_id = req.params.email;
    const db = student;
    db.deleteOne({ email: stu_id }, function (err, data) {
      if (err) {
        response = { success: false, status: "fail" };
        res.json(response);
      } else {
        if (err) {
          response = { success: false, msg: err };
        } else {
          response = {
            success: true,
            msg: "Student deleted successfully.:" + stu_id,
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
//Update Student By ID
router.put("/updateStudent", (req, res) => {
  const studentDetails = req.body;
  const id = studentDetails.id;
  const db = student;
  const update_data = { $set: {} };
  update_data.$set["firstName"] = studentDetails.firstName;
  update_data.$set["lastName"] = studentDetails.lastName;
  update_data.$set["country"] = studentDetails.country;
  update_data.$set["mobileNumber"] = studentDetails.mobileNumber;
  update_data.$set["email"] = studentDetails.email;
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
// const express = require("express");
// const router = express.Router();
// const student = require("../models/student");
// var mongo = require("mongodb");
// router.post("/createStudent", (req, res) => {
//   // try {
//   const userData = req.body;
//   // if (userData.email && userData.email !== '' && userData.password && userData.password !== '') {
//   // const hashPassword = require('crypto').createHash('md5').update(userData.password).digest('hex');
//   const db = new student();
//   db.firstName = userData.firstName;
//   db.lastName = userData.lastName;
//   db.email = userData.email;
//   db.mobileNumber = userData.mobileNumber;
//   db.password = userData.password;
//   db.save(function (err, userFound) {
//     if (err) {
//       response = { success: false, msg: err };
//       res.json(response);
//     } else {
//       response = { success: true, msg: "successfully student regiseter" };
//       res.json(response);
//     }
//   });
// });
// router.get("/getStudents", (req, res) => {
//   const db = student;
//   db.find({}, function (err, userDetails) {
//     if (err) {
//       response = { success: false, status: "fail" };
//       res.json(response);
//     } else {
//       if (userDetails && userDetails.length > 0) {
//         res.json({ success: true, data: userDetails });
//       } else {
//         res.json({ success: false, msg: "Student details not found" });
//       }
//     }
//   });
// });
// router.get("/getStudentById/:id", (req, res) => {
//   const id = req.params.id;
//   const db = student;
//   db.find({ _id: id }, function (err, userDetails) {
//     if (err) {
//       response = { success: false, status: "fail" };
//       res.json(response);
//     } else {
//       if (userDetails && userDetails.length > 0) {
//         res.send({ success: true, data: userDetails });
//       } else {
//         res.send({ success: false, msg: "Student details not found" });
//       }
//     }
//   });
// });
// router.put("/updateStudent", (req, res) => {
//   const studentDetails = req.body; // storing the data into obj
//   const id = studentDetails.id; // capturing id from studentDetails obj
//   const db = student; // DB model
//   const update_data = { $set: {} }; // create empty obj to store the data
//   //syntax: obj.$set["column_name"]= <value>
//   update_data.$set["firstName"] = studentDetails.firstName;
//   update_data.$set["lastName"] = studentDetails.lastName;
//   update_data.$set["country"] = studentDetails.country;
//   update_data.$set["mobileNumber"] = studentDetails.mobileNumber;
//   update_data.$set["email"] = studentDetails.email;
//   // console.log("studentDetails::",studentDetails);
//   db.aggregate(
//     [
//       {
//         $match: { _id: mongo.ObjectID(id) },
//       },
//     ],
//     function (err, data) {
//       if (err) {
//         response = { success: false, status: "fail" };
//         res.json(response);
//       } else {
//         // console.log("data::",data);
//         if (data && data.length > 0) {
//           // syntax: dbObj.updateOne({},update_obj,function(err){})
//           db.updateOne(
//             { _id: mongo.ObjectID(id) },
//             update_data,
//             function (err) {
//               if (err) {
//                 response = { success: false, msg: err };
//               } else {
//                 response = {
//                   success: true,
//                   msg: "Student updated successfully",
//                 };
//               }
//               res.json(response);
//             }
//           );
//         } else {
//           res.send({ success: false, msg: "Student id not found" });
//         }
//       }
//     }
//   );
// });
// router.delete("/deleteAllStudents", (req, res) => {
//   const db = student;
//   db.deleteMany({}, function (err, userDetails) {
//     if (err) {
//       response = { success: false, status: "fail" };
//       res.json(response);
//     } else {
//       res.json({ success: true, msg: "Student details deleted successfully" });
//     }
//   });
// });
// router.delete("/deleteStudentById/:student_id", (req, res) => {
//   try {
//     const stu_id = req.params.student_id;
//     const db = student;
//     db.deleteOne({ _id: stu_id }, function (err, data) {
//       if (err) {
//         response = { success: false, status: "fail" };
//         res.json(response);
//       } else {
//         if (err) {
//           response = { success: false, msg: err };
//         } else {
//           response = {
//             success: true,
//             msg: "Student deleted successfully.:" + stu_id,
//           };
//         }
//         res.json(response);
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     response = { success: false, msg: "Problem while sending the data" };
//     res.json(response);
//   }
// });
// router.delete("/deleteStudentByemail/:email_id", (req, res) => {
//   try {
//     const email_id = req.params.email_id;
//     const db = student;
//     db.deleteOne({ email: email_id }, function (err, data) {
//       if (err) {
//         response = { success: false, status: "fail" };
//         res.json(response);
//       } else {
//         if (err) {
//           response = { success: false, msg: err };
//         } else {
//           response = {
//             success: true,
//             msg: "Student deleted successfully.:" + email_id,
//           };
//         }
//         res.json(response);
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     response = { success: false, msg: "Problem while sending the data" };
//     res.json(response);
//   }
// });
// module.exports = router;
