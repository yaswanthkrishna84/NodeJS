const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const marksSchema = new Schema({
  stuName: {
    type: String,
    required: true,
  },
  stuNo: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNumber: {
    type: String,
    pattern: "^([0-9]{3}-[0-9]{3}-[0-9]{4}$",
    required: true,
    maxlength: 10,
  },
  addr: {
    type: String,
    required: true,
  },
  m1: {
    type: String,
    required: true,
  },
  m2: {
    type: String,
    required: true,
  },
  m3: {
    type: String,
    required: true,
  },
  m4: {
    type: String,
    required: true,
  },
  m5: {
    type: String,
    required: true,
  },
  m6: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  avg: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  percent: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("marks", marksSchema);
