const path = require("path");
const logger = require("morgan");
const express = require("express");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const sassMiddleware = require("node-sass-middleware");
const expressEjsLayout = require("express-ejs-layouts");
const { catchAllNotFound, errorRoute } = require("./middlewares/errorHandler");

const app = express();

/* view engine setup */
app.use(expressEjsLayout);
app.set("layout", "layout/layout");
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
      indentedSyntax: false, // true = .sass and false = .scss
   })
);

/* Static */
app.use(express.static(path.join(__dirname, "public")));

/* Routes */
app.use("/", indexRouter);

/* Handle All The Errors */
app.use(catchAllNotFound);
app.use(errorRoute);
module.exports = app;
