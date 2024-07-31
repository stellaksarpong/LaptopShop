"use strict";
const router = require("express").Router();
const authController = require("../controllers/auth.controller");
// const passport=require('../utils/passportConfig')

router.get("/login", authController.getLogin);
// router.post('/login',passport.authenticate('local',{successRedirect:'/',failureRedirect:'/',failureFlash:true}),authController.postLogin)
// router.post('/login',authController.postLogin)
router.get("/signup", authController.getSignUp);
router.post("/signup", authController.postSignUp);
module.exports = router;
