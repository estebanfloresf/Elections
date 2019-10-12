/**
 * Created by Esteban.Flores on 6/26/2017.
 */
const mongoose = require("mongoose");
const Candidate = mongoose.model("Candidate");
// const Results = mongoose.model("Results");
// const Province = mongoose.model("Province");

exports.getCandidates = async (req, res) => {
  //   //Order the candidates by their total votes
  //   function order(a, b) {
  //     if (a.total < b.total) {
  //       return -1;
  //     }
  //     if (a.total > b.total) {
  //       return 1;
  //     }
  //     return 0;
  //   }
  //   const totalvotes = await Results.getNationResults();
  const candidates = await Candidate.getAllCandidates();
  //   // 1) Loop throught the array of candidates
  //   // 2) get the top provinces votes from each provinceand save it into an array
  //   //3) save that array as part of the candidate value
  //   for (let i = 0; i < candidates.length; i++) {
  //     const topProvinces = await Results.getTopProvinces(candidates[i]._id);
  //     var totalPercentage = 0;
  //     topProvinces.forEach(function(elem) {
  //       totalPercentage += elem.men + elem.women;
  //     });
  //     candidates[i]["topProvinces"] = [];
  //     topProvinces.forEach(function(elem) {
  //       candidates[i]["topProvinces"].push({
  //         province: elem.province.name,
  //         percentage: ((elem.men + elem.women) / totalPercentage).toFixed(4)
  //       });
  //     });
  //   }
  //   candidates.forEach(function(candidate) {
  //     candidate["percentage"] = (
  //       candidate["total"] / totalvotes[0].total
  //     ).toFixed(4);
  //     candidate["menPerc"] = (candidate["totalmen"] / candidate["total"]).toFixed(
  //       4
  //     );
  //     candidate["womenPerc"] = (
  //       candidate["totalwomen"] / candidate["total"]
  //     ).toFixed(4);
  //   });
  //   candidates.sort(order);
  console.log(candidates);
  res.render("candidates", { title: "Candidates", candidates });
};
exports.getCandidatesInfo = async (req, res) => {
  const candidates = await Candidate.getAllCandidates();
  res.json(candidates);
};
