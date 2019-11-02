const mongoose = require("mongoose");

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split(".").map(parseFloat);
if (major <= 7 && minor <= 5) {
  console.log(
    "🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou're on an older version of node that doesn't support the latest and greatest things we are learning (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n "
  );
  process.exit();
}

// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("connected", function() {
  console.log("Connected to MongoDB: Success");
});
mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

//import all our models
// require("./models/Province");
require("./models/Candidate");
// require("./models/Survey");
// require("./models/Firm");
// require("./models/Results");

// Start our app!
const app = require("./app");

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log("Our app is running on http://localhost:" + port);
});
