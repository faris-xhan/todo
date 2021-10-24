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
      return res.json(result);
   } catch (error) {
      next(error);
   }
});

module.exports = router;
