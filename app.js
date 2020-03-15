require("dotenv").config({ path: ".env" }); // import environmental variables from our variables.env file
const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index");

// Start our app!
const app = express();
app.set("port", process.env.PORT || 8080);
app.disable("x-powered-by");

app.use(cors());
app.use(json()); // for response in json format
app.use(urlencoded({ extended: true })); // for query parameters on the urls
app.use(morgan("dev")); // this is just for logging the request

// After allllll that above middleware, we finally handle our own routes!
app.use("/api/candidate", routes);

// done! we export it so we can start the site in start.js
module.exports = app;
