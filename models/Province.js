/**
 * Created by Esteban.Flores on 7/14/2017.
 */

"use strict";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const provinceSchema = new mongoose.Schema({
  name: String,
  flag: String,
  svg_path: String,
  valid_votes: Number,
  blanks_votes: Number,
  null_votes: Number,
  electors: Number,
  suffragants: Number,
  absenteeism: Number,
  province_id: String
});

module.exports = mongoose.model("Province", provinceSchema);
