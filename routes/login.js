const express = require("express");
const userServices = require("../services/userServices");
const router = express.Router();

router.get("/", (req, res, next) => {
   res.render("login", { title: "TODO - Login" });
});

router.post("/", async (req, res, next) => {
   const { uname, passwd } = req.body;

   if (!uname || !passwd) {
      return res.render("login", {
         uname: uname,
         passwd: passwd,
         message: "Username or password is incorrect.",
      });
   }

   try {
      const rows = await userServices.getUser(uname, passwd);
      if (rows.length) {
         res.redirect("/dashboard");
      }
      req.flash("feedback", "Username or password doesn't exists");
      req.flash("uname", uname);
      req.flash("passwd", passwd);
      return res.redirect("/login");
   } catch (error) {
      next(error);
   }
});

module.exports = router;
