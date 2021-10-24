const db = require("./db");
const getTodos = async (user_id) => {
   const rows = await db.query(`SELECT * FROM todosList WHERE owner_id = ?`, [
      user_id,
   ]);

   return rows;
};

module.exports = {
   getTodos,
};
