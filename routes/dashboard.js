const express = require("express");
const privateRoute = require("../middlewares/privateRoute");
const { getTodos } = require("../services/todosListService");
const { getUser } = require("../services/userServices");
const router = express.Router();

/* GET home page. */
router.get("/", privateRoute, async (req, res, next) => {
   try {
      const todos = await getTodos(req.session.uid);
      res.render("dashboard", {
         title: "Dashboard",
         user: {
            uname: req.session.uname,
         },
         todoList: todos.map((todo) => todo.task),
      });
   } catch (error) {
      next(error);
   }
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
