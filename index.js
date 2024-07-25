const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2");
const app = express();
// const argon2 = require("argon2");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const { log } = require("console");
const port = 3000;
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("uploads"));
// mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "laptopshop",
});

app.get("/upload", (req, res) => {
  res.render("upload");
});
app.get("/login", (req, res) => {
  res.render("loginScreen");
});
app.get("/signup", (req, res) => {
  res.render("signupScreen");
});

app.post("/signup", async (req, res) => {
  try {
    let { Name, Email, Password } = req.body;
    // Password = await argon2.hash(Password);
    Password = await bcrypt.hash(Password, 12);
    const mysql = "INSERT INTO users(name,email,password)VALUES(?,?,?)";
    connection.query(mysql, [Name, Email, Password], (err, data) => {
      console.log(Name, Email, Password);
      if (!err) {
        //  redirect after successfull sign up
        return res.redirect("/");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);
    const mysql = "SELECT * FROM users WHERE email =?";
    connection.query(mysql, [email], async (err, data) => {
      if (!err) {
        const user = data[0];
        console.log(user);
        res.status(200).send("success");
      }
      // console.log(err);
    });
  } catch (error) {
    console.log(error);
  }
});
//     Password= await bcrypt.hash(Password,12)
//     const mysql = "INSERT INTO users(name,email,password)VALUES(?,?,?)";
//     connection.query(mysql, [Name, Email, Password], (err, data) => {
//       console.log(Name, Email, Password);
//    catch (error) {
//     console.log(error);
//   }
// })

app.get("/upload/image", (req, res) => {
  const mysql = "select * from images where id=2";
  connection.query(mysql, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.set("Content-Type", "image/jpeg");
    res.render("image", { image: data[0] });
  });
  // res.render('upload');
});

app.post("/upload", upload.single("image"), (req, res) => {
  const { filename, mimetype, size } = req.file;
  const imageData = fs.readFileSync(path.join(__dirname, "uploads", filename));

  // if (!image) {
  //   return res.status(400).send("No file uploaded.");
  // }

  //const imageName = image.originalname;
  //const imageData = image.buffer;

  const query = "INSERT INTO images (name, type, size, data) VALUES (?,?,?,?)";
  connection.query(
    query,
    [filename, mimetype, size, imageData],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error uploading image.");
      }
      res.send("Image uploaded successfully and save into databese!");
    }
  );
});

app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  const mysql = "INSERT INTO account (name,email,password) VALUES (?,?,?) ";
  try {
    connection.query(mysql, [name, email, password], (err, data) => {
      if (!err) return res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/product", async (req, res) => {
  const { brand, model, description, specification, categories } = req.body;
  const mysql =
    "INSERT INTO product(brand,model,description,specification,categories) VALUES (?,?,?,?,?) ";
  try {
    connection.query(
      mysql[(brand, model, description, specification, categories)],
      (err, data) => {
        if (!err) return res.json(data);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.get("/account", async (req, res) => {
  const mysql = "SELECT * FROM account";
  connection.query(mysql, (err, data) => {
    if (err) return res.json("error");
    return res.json(data);
  });
});

app.get("/laptop/:id", (req, res) => {
  const laptopId = parseInt(req.params.id);
  const laptop = laptops.find((l) => l.id === laptopId);

  if (laptop) {
    res.render("detail", { laptop });
  } else {
    res.status(404).send("Laptop not found");
  }
});

// Route to display laptop details

app.get("/", (req, res) => {
  // res.send("hi");
  res.render("index");
});
app.get("/product", (req, res) => {
  try {
    const mysql = "SELECT * FROM product";
    // res.render("product", { title: "Laptop Shop" });
    connection.query(mysql, (err, data) => {
      if (!err) res.render("product", { title: "Laptodatap Shop", data: data });
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  try {
    const mysql = `SELECT * FROM product WHERE id =${id}`;
    connection.query(mysql, (err, data) => {
      console.log(data);
      if (!err) res.render("detail", { title: "Laptop Shop", data: data[0] });
    });
    // res.render("detail", { title: "Laptop Shop", data: data });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
