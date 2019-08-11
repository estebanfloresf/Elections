const mongoose = require("mongoose");
// const Province = mongoose.model("Province");
// const Results = mongoose.model("Results");
const Candidate = mongoose.model("Candidate");

exports.getMapInfo = async (req, res) => {
  const provinces = await Province.find({
    path: {
      $ne: ""
    }
  }).select("name path -_id");

  const candidates = await Candidate.find({}).select("president _id ");

  res.status(200).json({
    provinces,
    candidates
  });
};

exports.provinceResults = async (req, res) => {
  const province = await Province.findOne({
    name: req.body.province.trim()
  }).select("-path -__v");
  const candidates = await Candidate.find({}).select("president _id ");

  const results = await Results.getProvinceResults(province._id);

  if (results) {
    res.status(200).json({
      results,
      province,
      candidates
    });
  } else {
    req.flashes("warning", "Whoops we could not retrieve any information");
  }
};
