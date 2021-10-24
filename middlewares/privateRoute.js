const privateRoute = (req, res, next) => {
   if (req.session.uname) {
      return next();
   }

   res.redirect("/");
};

module.exports = privateRoute;
