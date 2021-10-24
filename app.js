const path = require("path");
const redis = require("redis");
const logger = require("morgan");
const express = require("express");
const config = require("./configs");
const flash = require("express-flash");
const session = require("express-session");
const loginRouter = require("./routes/login");
const indexRouter = require("./routes/index");
const connectRedis = require("connect-redis");
const registerRouter = require("./routes/register");
const dashboardRouter = require("./routes/dashboard");
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

/* Redis Store  */
const RedisStore = connectRedis(session);
const redisClient = redis.createClient();
const store = new RedisStore({ client: redisClient });

/* Middlewares */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sassMiddleware(config.sassConfig));
app.use(session({ store, ...config.session }));
app.use(flash());

/* Static */
app.use(express.static(PUBLIC_PATH));

/* Routes */
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/dashboard", dashboardRouter);

/* Handle All The Errors */
app.use(catchAllNotFound);
app.use(errorRoute);
module.exports = app;
