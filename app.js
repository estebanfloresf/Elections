const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
<<<<<<< HEAD
const promisify = require('es6-promisify');
=======
const {
  promisify
} = require('es6-promisify');
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
// const favicon = require('express-favicon');

require('./handlers/passport');

// create our Express app
const app = express();

<<<<<<< HEAD
=======

>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

<<<<<<< HEAD
=======


>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
// serves click static files from the public folder. Anything in public/ will just be served click as the file it is
// app.use(favicon(__dirname + '/public/images/icons/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
=======


// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
<<<<<<< HEAD
app.use(
	session({
		secret: process.env.SECRET,
		key: process.env.KEY,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);
=======
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
<<<<<<< HEAD
	res.locals.h = helpers;
	res.locals.flashes = req.flash();
	res.locals.user = req.user || null;
	res.locals.currentPath = req.path;
	next();
=======
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
});

// promisify some callback based APIs
app.use((req, res, next) => {
<<<<<<< HEAD
	req.login = promisify(req.login, req);
	next();
=======
  req.login = promisify(req.login, req);
  next();
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
});

// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
<<<<<<< HEAD
	/* Development Error Handler - Prints stack trace */
	app.use(errorHandlers.developmentErrors);
=======
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
<<<<<<< HEAD
module.exports = app;
=======
module.exports = app;
>>>>>>> 8d124a91603859c16671a3116591e96a149e60b5
