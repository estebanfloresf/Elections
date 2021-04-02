// require("dotenv").config({ path: __dirname + "/../variables.env" });
require("dotenv").config({ path: ".env" });

const fs = require("fs");
const mongoose = require("mongoose");
// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
const Candidate = require("../models/Candidate");
// const Survey = require('../models/Survey');
// const Firm = require('../models/Firm');
const Results = require("../models/Results");
const Province = require("../models/Province");

const candidates = JSON.parse(
  fs.readFileSync(__dirname + "/json/candidates.json", "utf-8")
);
// const surveys = JSON.parse(fs.readFileSync(__dirname + '/surveys.json', 'utf-8'));
// const firms = JSON.parse(fs.readFileSync(__dirname + '/firms.json', 'utf-8'));
const results = JSON.parse(
  fs.readFileSync(__dirname + "/json/results.json", "utf-8")
);
const province = JSON.parse(
  fs.readFileSync(__dirname + "/json/provinces.json", "utf-8")
);

async function deleteData() {
  console.log("😢😢 Goodbye Data...");
  await Candidate.remove();
  // await Survey.remove();
  // await Firm.remove();
  await Province.remove();
  await Results.remove();
  // await Results.deleteMany({}, (err, data) => {
  //   if (err) {
  //     console.log("An error occured deleting data");
  //   }
  //   console.log(
  //     "Data Deleted. To load sample data, run\n\n\t npm run sample\n\n"
  //   );
  // });

  process.exit();
}

async function loadData() {
  try {
    await Candidate.insertMany(candidates);
    await Results.insertMany(results);
    await Province.insertMany(province);
    // await Survey.insertMany(surveys);
    // await Firm.insertMany(firms);
    console.log("👍👍👍👍👍👍👍👍 Done!");
    process.exit();
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes("--delete")) {
  deleteData();
} else {
  loadData();
}
