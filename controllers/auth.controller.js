"use strict";
const connection = require("../utils/db");
const bcrypt = require("bcryptjs");
// ===LOGIN===
const getLogin = (req, res, next) => {
  try {
    res.render("./loginScreen");
  } catch (error) {
    console.log(error);
  }
};

const postLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const sql = `SELECT * FROM users WHERE email=?`;
      connection.query(sql, email, async(error, data) => {
        if (!error) {
          console.log("found user");
          const hashpassword = data[0]?.password;
          bcrypt.compare(password, hashpassword,(err,match)=>{
           if (err)throw err
           if (match) {
            return res.json('match')
            
           } else {
            return res.json('no match')
           }
          });
          // console.log(verify);
          // res.json(verify);
        } else {
          console.log("no such user");
          res.status(404).json("oops");
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.send("email and password required");
  }
};
// ===END OF LOGIN===

// ===SIGNUP===
const getSignUp = (req, res, next) => {
  try {
    res.status(200).render("./signupScreen");
  } catch (error) {
    console.log(error);
  }
};

const postSignUp = (req, res, next) => {
  try {
    const { Name, Email, Password } = req.body;
    console.log(req.body);
    const sql = `SELECT * FROM users WHERE email=?`;
    connection.query(sql, [Email], (err, data) => {
      if (err) throw err;
      if (data.length > 0) {
        return res.status(401).send("user already exist...");
      } else {
        const hashpassword = bcrypt.hashSync(Password, 10);
        const mysql = "INSERT INTO users(name,email,password)VALUES(?,?,?)";
        connection.query(mysql, [Name, Email, hashpassword], (err, data) => {
          console.log(Name, Email, Password);
          if (!err) {
            //  redirect after successfull sign up
            return res.redirect("/");
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
// ===END OF SIGN UP===
module.exports = {
  getLogin,
  getSignUp,
  postSignUp,
  postLogin,
};
