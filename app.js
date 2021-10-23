const path = require("path");
const logger = require("morgan");
const express = require("express");
const createError = require("http-errors");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const sassMiddleware = require("node-sass-middleware");

const app = express();

/* view engine setup */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* Middlewares */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
   sassMiddleware({
      src: path.join(__dirname, "public"),
      dest: path.join(__dirname, "public"),
      indentedSyntax: true, // true = .sass and false = .scss
      sourceMap: true,
   })
);

/* Static */
app.use(express.static(path.join(__dirname, "public")));

/* Routes */
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get("env") === "development" ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render("error");
});

module.exports = app;
