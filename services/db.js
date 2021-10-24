const config = require("../configs");
const mysql = require("mysql2/promise");

const query = async (sql, params) => {
   const connection = await mysql.createConnection(config.db);
   const [resutls] = await connection.execute(sql, params);
   return resutls;
};

module.exports = {
   query,
};
