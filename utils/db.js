"use strict";
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectTimeout: 10000
});
// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   connectTimeout: 10000
// });

// connection.connect((error) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("connected to db");
//   }
// });

connection.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconnecting to the database...');
    connection.connect((err) => {
      if (err) {
        console.error('Error reconnecting to the database:', err);
      } else {
        console.log('Reconnected to the database');
      }
    });
  } else {
    throw err;
  }
});

module.exports = connection.promise()
