const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
   res.render("register", { title: "TODO - Login" });
});

router.post("/", (req, res, next) => {
   const { uname, passwd, email } = req.body;

   if (!uname || !passwd || !email) {
      return res.render("register", {
         uname,
         passwd,
         email,
         message: "Please recheck you're values.",
      });
   }

   return res.render("register", {
      uname,
      passwd,
      email,
      message: "User created succesfully",
   });
});

module.exports = router;
