const db = require("./db");
const getTodos = async (user_id) => {
   const rows = await db.query(`SELECT * FROM todosList WHERE owner_id = ?`, [
      user_id,
   ]);

   return rows;
};

const createTodo = async (owner_id, task) => {
   const result = await db.query(
      `INSERT INTO todosList(onwer_id, task) VLAUES(?, ?)`[(owner_id, task)]
   );

   return result;
};

module.exports = {
   getTodos,
   createTodo,
};
