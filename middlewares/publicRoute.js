const publicRoute = (req, res, next) => {
   if (req.session.uname) {
      return res.redirect("/dashboard");
   }

   next();
};

module.exports = publicRoute;
