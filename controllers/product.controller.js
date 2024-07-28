"use strict";
const connection = require("../utils/db");
const getProducts = (req, res, next) => {
  try {
    const mysql = "SELECT * FROM product";
    // res.render("product", { title: "Laptop Shop" });
    connection.query(mysql, (err, data) => {
      if (!err)
        res.status(200).render("product", { title: "Products", data: data });
    });
  } catch (error) {
    console.log(error);
  }
};

const postProduct = (req, res, next) => {
  const { brand, model, description, specification, categories } = req.body;
  const mysql ="INSERT INTO product(brand,model,description,specification,categories) VALUES (?,?,?,?,?) ";
  try {
    connection.query(mysql[(brand, model, description, specification, categories)],(err, data) => {
        if (!err) {
          return res.status(200).json(data);
        }else{
            console.log(err)
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getSingleProductDetails=(req,res,next)=>{
    const id = req.params.id;
  try {
    const mysql = `SELECT * FROM product WHERE id =${id}`;
    connection.query(mysql, (err, data) => {
      console.log(data);
      if (!err){ res.status(200).render("detail", { title: "Laptop Shop", data: data[0] });}
      else{
        return res.status(404).json(err)
      }
    });
    // res.render("detail", { title: "Laptop Shop", data: data });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  postProduct,
  getSingleProductDetails
  // getSingleProduct
};
