// import environmental variables from our variables.env file
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const Bundler = require("parcel-bundler");

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: false
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("connected", function() {
  console.log("Connected to MongoDB: Success");
});
mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
console.log(mongoose.connection.readyState);
//import all our models
require("./models/Candidate");

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

// const file = "./client/index.html"; // Pass an absolute path to the entrypoint here
// const options = {}; // See options section of  Parcel api docs, for the possibilities

// Initialize a new bundler using a file and options
// const bundler = new Bundler(file, options);

// Let express use the bundler middleware, this will let Parcel handle every request over your express server
// app.use(bundler.middleware());

// Start our app!
const app = require("./app");

app.listen(port, function() {
  console.log("Our app is running on http://localhost:" + port);
});
