const createError = require("http-errors");

/* catch 404 and forward to error handler */
const catchAllNotFound = (req, res, next) => next(createError(404));

/**
 * Errors that occur in synchronous code inside route handlers
 * and middleware require no extra work.
 * For errors returned from asynchronous functions invoked by route handlers
 * and middleware, you must pass them to the next() function
 * https://expressjs.com/en/guide/error-handling.html
 */
const errorRoute = (err, req, res, next) => {
   // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get("env") === "development" ? err : {};

   // render the error page
   res.status(err.status || 500);
   res.render("error");
};

module.exports = {
   catchAllNotFound,
   errorRoute,
};
