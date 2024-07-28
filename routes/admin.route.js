"use strict";
const router = require("express").Router();
const adminController = require("../controllers/admin.controller");

router.get("/", adminController.index);
router.get("/viewlaptops", adminController.viewlaptops);
router.get("/addlaptop", adminController.addLaptopGet);
router.post('/addlaptop',adminController.addLaptopPost)
router.get("/laptoporders", adminController.laptopOrders);

module.exports = router;
