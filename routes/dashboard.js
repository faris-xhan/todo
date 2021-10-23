const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
   res.render("dashboard", {
      title: "Dashboard",
      user: {
         uname: "Faris",
      },
      todoList: ["Goto shopping", "Start paper"],
   });
});

module.exports = router;
