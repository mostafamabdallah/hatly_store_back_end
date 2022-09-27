const mysql = require("mysql");

const db = mysql.createPool({
  host: "34.65.43.74",
  user: "myuser",
  password: "mypass",
  database: "_ce526a619e3f46ae",
});

// const con = mysql.createConnection({
//   host: "34.65.137.94",
//   port:'3306',
//   user: "root",
//   password: "fTSBuTCkz_LA7UlaPsJZ1tpOe",
//   database: "hatly-store",
// });

// con.connect((err) => {
//   if (err) {
//     console.log("Not Connected!", err);
//   } else {
//     console.log("Connected!");
//   }
// });
module.exports = db;
