"user strict";
const mysql = require("mysql");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mars_kyc12",
});



// const connection = mysql.createPool({
//   host: "3.111.163.115",
//   user: "root",
//   password: "anuj@3112",
//   database: "mars_kyc",
// });


// const connection = mysql.createPool({
//   host: "13.234.162.67",
//   user: "anuj",
//   password: "Anuj@3112",
//   database: "kyc",
// });

module.exports = connection;
