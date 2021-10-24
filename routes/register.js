const express = require("express");
const userServices = require("../services/userServices");
const router = express.Router();

router.get("/", (req, res, next) => {
   res.render("register", { title: "TODO - Login" });
});

router.post("/", async (req, res, next) => {
   const { uname, passwd, email } = req.body;

   if (!uname || !passwd || !email) {
      return res.render("register", {
         uname,
         passwd,
         email,
         message: "Please recheck you're values.",
      });
   }

   try {
      const result = await userServices.createUser(uname, email, passwd);
      if (result.affectedRows) {
         req.flash("feedback", "User created succesfully.");
         return res.redirect("/login");
      }
   } catch (error) {
      if (error?.code === "ER_DUP_ENTRY") {
         req.flash("feedback", "Username or email already exists.");
         req.flash("uname", uname);
         req.flash("passwd", passwd);
         req.flash("email", email);
         return res.redirect("/register");
      }
      next(error);
   }
});

module.exports = router;
