const express = require("express");
const privateRoute = require("../middlewares/privateRoute");
const router = express.Router();

/* GET home page. */
router.get("/", privateRoute, (req, res, next) => {
   res.render("dashboard", {
      title: "Dashboard",
      user: {
         uname: req.session.uname,
      },
      todoList: ["Goto shopping", "Start paper"],
   });
});

router.get("/logout", privateRoute, (req, res, next) => {
   req.session.destroy((err) => {
      if (err) {
         return console.log(err);
      }
      res.redirect("/");
   });
});

module.exports = router;
