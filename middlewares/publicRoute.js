const publicRoute = (req, res, next) => {
   if (req.sessionID) {
      return res.redirect("/dashboard");
   }

   next();
};

module.exports = publicRoute;
