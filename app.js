// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
//require('dotenv/config');
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');
hbs.registerHelper('ifeq', function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper("stars", function(count) {
  return "★".repeat(count) + "☆".repeat(5-count) 
})

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// default value for title local
const projectName = 'Dinerah';
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}`;

const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 24 * 60 * 60, // your cookie will be cleared after these seconds
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/dinera',
      // Time to Live for sessions in DB. After that time it will delete it!
      ttl: 24 * 60 * 60, // your session will be cleared after these seconds
    }),
  })
);

app.use((req, res, next) => {
  req.app.locals.isLoggedIn = !!req.session.loggedInUser;
  next();
});

app.use((req, res, next) => {
  // req.app.locals.profilePic = "images/default-avatar.png"
  // if (req.app.locals.isLoggedIn) {
  //    req.app.locals.profilePic = req.session.loggedInUser.profilePic
  // }
  req.app.locals.isLoggedIn = !!req.session.loggedInUser;
  next();
});

app.use(function (req, res, next) {
  // clears all the memory after going back 
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next()
});


// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);

const recipes = require('./routes/recipe.routes');
app.use('/', recipes);

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

const user = require('./routes/user.routes');
app.use('/', user);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
