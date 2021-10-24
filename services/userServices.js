const db = require("./db");

const getUser = async (uname, password) => {
   const rows = await db.query(
      `SELECT * FROM users WHERE uname = ? AND password = ?`,
      [uname, password]
   );
   return rows;
};

module.exports = {
   getUser,
};
