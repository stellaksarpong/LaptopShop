"use strict";
const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get("/", adminController.index);
router.get("/viewlaptops", adminController.viewlaptops);
// router.get('/viewlaptops/edit/:id',adminController.viewlaptopsEditGet);
router.get("/addlaptop", adminController.addLaptopGet);
router.post('/addlaptop',adminController.addLaptopPost)
router.get('/viewlaptops/image/:id',adminController.addLaptopImageGet)
router.post('/viewlaptops/image/:id',upload.array("file",10),adminController.addLaptopImagePost)
router.get("/laptoporders", adminController.laptopOrders);

module.exports = router;
