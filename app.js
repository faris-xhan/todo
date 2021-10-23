const path = require("path");
const logger = require("morgan");
const express = require("express");
const config = require("./configs");
const indexRouter = require("./routes/index");
const sassMiddleware = require("node-sass-middleware");
const expressEjsLayout = require("express-ejs-layouts");
const { catchAllNotFound, errorRoute } = require("./middlewares/errorHandler");

/* GLOBALS  */
const PUBLIC_PATH = path.resolve(__dirname, "public");
const VIEWS_PATH = path.resolve(__dirname, "views");

const app = express();

/* view engine setup */
app.use(expressEjsLayout);
app.set("layout", "layout/layout");
app.set("views", VIEWS_PATH);
app.set("view engine", "ejs");

/* Middlewares */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sassMiddleware(config.sassConfig));

/* Static */
app.use(express.static(PUBLIC_PATH));

/* Routes */
app.use("/", indexRouter);

/* Handle All The Errors */
app.use(catchAllNotFound);
app.use(errorRoute);
module.exports = app;
