"use strict";

const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// const Results = mongoose.model("Results");

const candidateSchema = new mongoose.Schema({
  candidate: {
    type: String,
    lowercase: true,
    trim: true,
    required: "There must be a president candidate"
  },
  vicepresident: {
    type: String,
    lowercase: true,
    trim: true,
    required: "There must be a vicepresident candidate"
  },
  organization: {
    type: String,
    lowercase: true,
    trim: true,
    required: "Candidate must have an organization"
  },

  image: String,
  image_vicepresident: String
});

// candidateSchema.statics.getNationResults = function() {
//   return this.aggregate([
//     {
//       $lookup: {
//         from: "results",
//         localField: "_id",
//         foreignField: "candidate",
//         as: "results"
//       }
//     },
//     { $match: { "results.0": { $exists: true } } }, // just to get rid of no values

//     {
//       $project: {
//         totalmen: { $sum: "$results.men" },
//         totalwomen: { $sum: "$results.women" },
//         president: "$$ROOT.president",
//         photo_president: "$$ROOT.photo_president",
//         polorg: "$$ROOT.polorg"
//       }
//     },

//     {
//       $project: {
//         president: "$president",
//         photo_president: "$photo_president",
//         polorg: "$polorg",
//         totalmen: "$totalmen",
//         totalwomen: "$totalwomen",
//         total: { $add: ["$totalmen", "$totalwomen"] }
//       }
//     }
//   ]);
// };

// candidateSchema.statics.getAllCandidates = function() {
//   return this.find({}, function(err, results) {
//     if (err) {
//       console.log(err.message);
//     }
//     return results;
//   });
// };

module.exports = mongoose.model("Candidate", candidateSchema, "candidates");
