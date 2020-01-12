/**
 * Created by Esteban.Flores on 7/14/2017.
 */

"use strict";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const firmSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    required: "Please enter a polling firm name!"
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true
  },
  ranking: Number,
  logo: {
    type: String,
    trim: true,
    lowercase: true
  }
});

module.exports = mongoose.model("Firm", firmSchema);
