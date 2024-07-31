"use strict";
const connection = require("../utils/db");
const getProducts = async(req, res, next) => {
  try {
    const mysql = "SELECT * FROM product";
    // res.render("product", { title: "Laptop Shop" });
    const [rows,fields]=await connection.query(mysql)
      res.status(200).render("product", { title: "Products", data: rows });
  } catch (error) {
    console.log(error);
  }
};

const postProduct = async(req, res, next) => {
  const { brand, model, description, categories } = req.body;
  const sql ="INSERT INTO product(brand,model,description,categories) VALUES (?,?,?,?) ";
  try {
   await connection.query(sql[brand, model, description,categories]);
   res.status(200)
  } catch (error) {
    console.log(error);
  }
};

const getSingleProductDetails=async(req,res,next)=>{
    const id = req.params.id;
  try {
    const mysql = `SELECT * FROM product WHERE id =${id}`;
    const [rows,fields]=await connection.query(mysql);
    res.status(200).render("detail", { title: "Laptop Shop", data: rows })
    // res.render("detail", { title: "Laptop Shop", data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).send('error')
  }
}

module.exports = {
  getProducts,
  postProduct,
  getSingleProductDetails
  // getSingleProduct
};
