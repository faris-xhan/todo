const db = require("./db");

const getUser = async (uname, password) => {
   const rows = await db.query(
      `SELECT * FROM users WHERE uname = ? AND password = ?`,
      [uname, password]
   );
   return rows;
};

const createUser = async (uname, email, password) => {
   const result = await db.query(
      `INSERT INTO users(uname, email, password) VALUES( ?, ?, ?)`,
      [uname, email, password]
   );

   return result;
};

module.exports = {
   getUser,
   createUser,
};
