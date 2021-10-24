const express = require("express");
const publicRoute = require("../middlewares/publicRoute");
const router = express.Router();

/* GET home page. */
router.get("/", publicRoute, (req, res, next) => {
   res.render("index", { title: "Express" });
});

module.exports = router;
