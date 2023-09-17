var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
// morgan is a debugging your backend application
var logger = require("morgan");
// express-session is a middleware to manage sessions for users and login
const session = require("express-session");
// authChecker is a middleware to check if the user is logged in
const authChecker = require("./utils/authChecker");
// cors is a middleware to allow cross-origin requests
// cross-origin requests are requests from a different domain
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var fleetsRouter = require('./routes/fleets');
var kudosRouter = require('./routes/kudos');
var followsRouter = require('./routes/follows');

require("./lib/connectMongoose");

var app = express();

app.locals.title = "Flitter";

// view engine setup
app.set("views", path.join(__dirname, "views"));
// EJS is a popular view engine for Express.js that allows you to embed
// JavaScript code in HTML templates to generate dynamic content.
app.set("view engine", "ejs");

const expireTime = 1000 * 60 * 60 * 2;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: expireTime },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Setup swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./api-flitter/apidoc.json");

app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", false);

  // Pass to next layer of middleware
  next();
});

// Setup routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/fleets', fleetsRouter);
app.use('/api/kudos', kudosRouter);
app.use('/api/follows', followsRouter);
// TODO:mmc:17-09-23: Review if the following line is needed
app.use(express.static('public'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
