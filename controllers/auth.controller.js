"use strict";
const connection = require("../utils/db");
const bcrypt = require("bcryptjs");
// const crypto=require('crypto')
// const passport=require('passport')
// const LocalStrategy=require('passport-local').Strategy
// =======================================================================================
const pbkdf2 = (password, salt) => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
      if (err) {
        return reject(err);
      }
      resolve(hashedPassword.toString('hex'));
    });
  });
};
// =======================================================================================
// ===LOGIN===
const getLogin = (req, res, next) => {
  try {
    res.render("./loginScreen");
  } catch (error) {
    console.log(error);
  }
};

// const postLogin = async(req, res, next) => {
//   const {email,password}=req.body
//   try {
//     if(email&&password){
//       const sql=`SELECT * FROM users WHERE email=?`
//       const[rows,fields]=await connection.query(sql,[email])
//       if(rows.length===0){
//         console.log('no such user');
//       }else{
//         const verify=await bcrypt.compare(password,rows[0].password)
//         console.log(verify);
//         if(verify){
//           req.session.user=rows[0].role
//          return res.redirect('/');
//         }else{
//          return res.redirect('/login')
//         }
//       }
//     }else{
//       return res.send('all fields required')
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(404).send('wahala signin in oo')
//   }
  
// };
// ===END OF LOGIN===

// ===SIGNUP===
const getSignUp = (req, res, next) => {
  try {
    res.status(200).render("./signupScreen");
  } catch (error) {
    console.log(error);
  }
};

const postSignUp = async(req, res, next) => {
  try {
    const { Name, Email, Password } = req.body;
    // var salt = crypto.randomBytes(16).toString('hex');

    // const hashedPassword = await pbkdf2(Password, salt);
    const sql=`SELECT * FROM users WHERE email=?`
    const[rows,fields]= await connection.query(sql,[Email])
    if(rows.length===0){
      console.log(Password);
      // console.log();
      const hashedPassword=await bcrypt.hash(Password,10)
      console.log(hashedPassword);
      const sql=`INSERT INTO users (name,email,password) VALUES (?,?,?)`
      await connection.query(sql,[Name,Email,hashedPassword])
    res.status(200).send('user created')
    }else{console.log('user already exists');}
  } catch (error) {
    console.log(error);
    return res.status(500).send('could not create user')
  }
};
// ===END OF SIGN UP===
module.exports = {
  getLogin,
  getSignUp,
  postSignUp,
  // postLogin,
};
