const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
   res.render("login", { title: "TODO - Login" });
});

router.post("/", (req, res, next) => {
   const { uname, passwd } = req.body;

   if (!uname || !passwd) {
      return res.render("login", {
         uname: uname,
         passwd: passwd,
         message: "Username or password is incorrect.",
      });
   }

   return res.render("login", {
      uname: uname,
      passwd: passwd,
      message: "User logged in succesfully",
   });
});

module.exports = router;
