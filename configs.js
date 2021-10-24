require("dotenv").config();
const path = require("path");
const env = process.env;

const config = {
   sassConfig: {
      src: path.join(__dirname, "public"),
      dest: path.join(__dirname, "public"),
      indentedSyntax: false, // true = .sass and false = .scss
   },
   session: {
      secret: "MyLittleSecret",
      resave: true,
      saveUninitialized: true,
   },
   db: {
      host: env.DB_HOST || "localhost",
      user: env.DB_USER || "root",
      password: env.DB_PASSWORD || "root",
      database: env.DB_NAME || "test",
   },
};

module.exports = config;
