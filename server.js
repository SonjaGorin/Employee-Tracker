const mysql = require("mysql2");
const util = require('util');

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "temppass",
      database: "employee_tracker_db"
    },
);

const query = util.promisify(db.query).bind(db);
module.exports = query;