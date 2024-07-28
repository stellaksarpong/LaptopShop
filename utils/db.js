"use strict";
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("connected to db");
  }
});

module.exports = connection;
