"use strict";
const connection = require("../utils/db");
const fs = require("fs");

const index = (req, res, next) => {
  try {
    res.render("admin/index");
  } catch (error) {
    return res.status(404).send("page not found");
  }
};
const viewlaptops = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM product`;
    const [rows, fields] = await connection.query(sql);
    res.render("admin/viewlaptops", { data: rows });
  } catch (error) {
    console.log(error);
    return res.status(404).send("page not found");
  }
};

const viewlaptopsEditGet = (req, res, next) => {
  const id = req.params.id;
  try {
    const sql = `SELECT * FROM product WHERE id=?`;
    connection.query(sql, id, (err, data) => {
      if (err) throw err;
      console.log(data[0]);
      res.render("admin/viewlaptopsEdit", { data: data[0] });
    });
  } catch (error) {
    return res.status(404).send("page not found");
  }
};
// const viewlaptopsEditPost=(req,res,next)=>{
//   try {
//     const sql=`UPDATE produc`
//   } catch (error) {
//     return res.status(500).send('error updating')
//   }
// }

const addLaptopGet = (req, res, next) => {
  try {
    res.render("admin/addlaptop");
  } catch (error) {
    return res.status(404).send("page not found");
  }
};

const addLaptopPost = (req, res, next) => {
  const { brand, model, category, description } = req.body;
  try {
    if (brand && model && category && description) {
      const sql = `INSERT INTO product (brand,model,description,categories) VALUES (?,?,?,?)`;
      connection.query(sql, [brand, model, description, category]);
      return res.status(201).send("laptop added successfully");
    } else {
      return res.send("All fields are required..");
    }
  } catch (error) {
    res.send(error);
  }
};

const addLaptopImageGet = (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    res.render("admin/addLaptopImage", { id: id });
  } catch (error) {
    return res.status(404).send("page not found...");
  }
};
const addLaptopImagePost = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }

    const files = req.files;
    // const { filename, mimetype, size } = req.file;
    console.log(files);
    const id = req.params.id;

    const promises = files.map((file) => {
      const imgData = fs.readFileSync(file.path);
      const query =
        "INSERT INTO images (product_id,name,type,size,data) VALUES (?,?,?,?,?)";
      return connection.query(query, [
        id,
        file.filename,
        file.mimetype,
        file.size,
        imgData,
      ]);

      // Optionally, delete the file from the server after uploading to DB
      fs.unlinkSync(file.path);
    });
    await Promise.all(promises);
    res.status(200).send("Files uploaded successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("error uploading images");
  }
};

const laptopOrders = (req, res, next) => {
  try {
    res.render("admin/laptoporders");
  } catch (error) {
    return res.status(404).send("page not found");
  }
};

module.exports = {
  index,
  viewlaptops,
  viewlaptopsEditGet,
  addLaptopGet,
  addLaptopPost,
  addLaptopImageGet,
  addLaptopImagePost,
  laptopOrders,
};
