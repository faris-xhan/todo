const path = require("path");
const config = {
   sassConfig: {
      src: path.join(__dirname, "public"),
      dest: path.join(__dirname, "public"),
      indentedSyntax: false, // true = .sass and false = .scss
   },
};

module.exports = config;
