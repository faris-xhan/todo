const express = require("express");
const privateRoute = require("../middlewares/privateRoute");
const router = express.Router();

/* GET home page. */
router.get("/", privateRoute, (req, res, next) => {
   res.render("dashboard", {
      title: "Dashboard",
      user: {
         uname: "Faris",
      },
      todoList: ["Goto shopping", "Start paper"],
   });
});

module.exports = router;
