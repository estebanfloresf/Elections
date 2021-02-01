require("dotenv").config({ path: ".env" }); // import environmental variables from our variables.env file
const express = require("express");
const { json, urlencoded } = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/index");
const errorHandlers = require("./handlers/errorHandlers");
const path = require("path");
const helpers = require("./helpers");
const publicDir = require("path").join(__dirname, "/public");

// Start our app!
const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views")); // this is the folder where we keep our pug files
app.set("view engine", "pug"); // we use the engine pug, mustache or EJS work great too
app.set("port", process.env.PORT || 8080);
app.disable("x-powered-by");

app.use(cors());
app.use(json()); // for response in json format
app.use(urlencoded({ extended: true })); // for query parameters on the urls
app.use(morgan("dev")); // this is just for logging the request
app.use(express.static(publicDir));

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  next();
});

// After allllll that above middleware, we finally handle our own routes!
app.use("/", routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get("env") === "development") {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
