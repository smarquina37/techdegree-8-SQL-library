const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

// Import the instance of sequelize
const Sequelize = require("./models/index.js").sequelize;

// Use sequelize.sync() method to sync the model with the database
(async () => {
  await Sequelize.sync();
  try {
    // Use the sequelize.authenticate() method to asynchronously connect to the database
    await Sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoutes); //Changed from indexRouter
app.use("/books", booksRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // const err = new Error("Not Found"); //Take "Not Found" off?
  res.status(404).render("page-not-found");
});

// error handlers
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

/* Global error handler */
app.use((err, req, res, next) => {
  if (err) {
    console.log("Global error handler called", err);
  }
  if (err.status === 404) {
    res.status(404).render("page-not-found", { err });
  } else {
    err.message =
      err.message || "Oops! It looks like something went wrong on the server";
    res.status(err.status || 500).render("error", { err });
  }
});

module.exports = app;
