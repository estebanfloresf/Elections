require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
// const Candidate = require('../models/Candidate');
const Survey = require('../models/Survey');
// const Firm = require('../models/Firm');
// const Results = require('../models/Results');
// const Province = require('../models/Province');


// const candidates = JSON.parse(fs.readFileSync(__dirname + '/candidates.json', 'utf-8'));
const surveys = JSON.parse(fs.readFileSync(__dirname + '/surveys.json', 'utf-8'));
// const firms = JSON.parse(fs.readFileSync(__dirname + '/firms.json', 'utf-8'));
// const results = JSON.parse(fs.readFileSync(__dirname + '/results.json', 'utf-8'));
// const province = JSON.parse(fs.readFileSync(__dirname + '/provinces.json', 'utf-8'));


async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  // await Candidate.remove();
  await Survey.remove();
  // await Firm.remove();
  // await Results.remove();
  // await Province.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run sample\n\n');
  process.exit();
}

async function loadData() {
  try {
    // await Candidate.insertMany(candidates);
    await Survey.insertMany(surveys);
    // await Firm.insertMany(firms);
    // await Results.insertMany(results);
    // await Province.insertMany(province);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run blowitallaway\n\n\n');
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
