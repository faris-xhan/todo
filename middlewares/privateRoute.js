const privateRoute = (req, res, next) => {
   if (req.sessionID) {
      return next();
   }

   res.redirect("/");
};

module.exports = privateRoute;
