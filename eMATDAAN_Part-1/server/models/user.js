const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    firstName: {
      type: String,
      
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      
    },
    aadharNumber: {
      type: Number,
      // required: true,
    },
    userAge: {
      type: Number,
      max: 100,
      min: 0,
    },
    userGender: {
      type: String,
    },
    userPinCode: {
      type: String,
    },
    address1: {
      type: String,
    },
    epicNumber: {
      type: Number,
    },
    address2: {
      type: String,
    },
    userState: {
      type: String,
    },
    userDistrict: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
      max: 50,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", User);
