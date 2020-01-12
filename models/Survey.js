/**
 * Created by Esteban.Flores on 6/21/2017.
 */
"use strict";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const surveySchema = new mongoose.Schema({
  firm: {
    type: mongoose.Schema.ObjectId,
    ref: "Firm",
    required: "Please enter a polling firm!"
  },
  number: Number,
  name: String,
  eleccion: String,
  source: String,
  margin: Number,
  date: Date,
  cities: [String],
  candidates: [
    {
      percentage: Number,
      candidate: {
        type: mongoose.Schema.ObjectId,
        ref: "Candidate",
        required: "You must supply a candidate"
      }
    }
  ]
});

module.exports = mongoose.model("Survey", surveySchema);
