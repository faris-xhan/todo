const express = require("express");
const privateRoute = require("../middlewares/privateRoute");
const { getTodos, createTodo } = require("../services/todosListService");
const router = express.Router();

/* GET home page. */
router.get("/", privateRoute, async (req, res, next) => {
   try {
      const todos = await getTodos(req.session.uid);
      return res.render("dashboard", {
         title: "Dashboard",
         uname: req.session.uname,
         feedback: req.session.feedback,
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

router.post("/todo", privateRoute, async (req, res, next) => {
   const { task } = req.body;

   if (!task) {
      req.session.feedback = "please provide a task";
      return res.redirect("/dashboard");
   }

   try {
      const result = await createTodo(req.session.uid, task);
      if (result.affectedRows) {
         return res.redirect("/dashboard");
      }
      req.session.feedback = "There was a problem in adding todo try again.";
      return res.redirect("/dashboard");
   } catch (error) {
      next(error);
   }
});

module.exports = router;
