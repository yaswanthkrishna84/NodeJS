const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  mobileNumber: {
    type: String,
    pattern: "^([0-9]{3}-[0-9]{3}-[0-9]{4}$",
    required: true,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("students", studentSchema);
// (m1,m2,m3,m4,m5,m6,total,avg,grade,percent,stu_no,stu_name,mobile,addr)
