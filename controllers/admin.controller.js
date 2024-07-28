"use strict";
const connection=require('../utils/db')
const index = (req, res, next) => {
  try {
    res.render("admin/index");
  } catch (error) {
    return res.status(404).send("page not found");
  }
};
const viewlaptops=(req,res,next)=>{
  try {
    const sql=`SELECT * FROM product`
    connection.query(sql,(err,data)=>{
      if(err)throw err

      res.render('admin/viewlaptops',{data:data})
    })
  } catch (error) {
    return res.status(404).send('page not found')
  }
}

const addLaptopGet=(req,res,next)=>{
  try {
    res.render('admin/addlaptop')
  } catch (error) {
    return res.status(404).send('page not found')
  }
}

const addLaptopPost=(req,res,next)=>{
  const {brand,model,category,description}=req.body
  try {
    if (brand&&model&&category&&description) {
      const sql=`INSERT INTO product (brand,model,description,categories) VALUES (?,?,?,?)`
      connection.query(sql,[brand,model,description,category],(err,data)=>{
        if(err)throw err
        return res.status(201).send('laptop added successfully')
      })
    } else {
      return res.send('All fields are required..')
    }
  } catch (error) {
    res.send(error)
  }
}

const laptopOrders=(req,res,next)=>{
  try {
    res.render('admin/laptoporders')
  } catch (error) {
    return res.status(404).send('page not found')
  }
}

module.exports = {
  index,
  viewlaptops,
  addLaptopGet,
  addLaptopPost,
  laptopOrders
};
