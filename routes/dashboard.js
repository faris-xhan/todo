const express = require("express");
const privateRoute = require("../middlewares/privateRoute");
const { getTodos } = require("../services/todosListService");
const { getUser } = require("../services/userServices");
const router = express.Router();

/* GET home page. */
router.get("/", privateRoute, async (req, res, next) => {
   const [user] = await getUser(req.session.uname, "123");
   const todos = await getTodos(user.id);
   res.render("dashboard", {
      title: "Dashboard",
      user: {
         uname: req.session.uname,
      },
      todoList: todos.map((todo) => todo.task),
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
