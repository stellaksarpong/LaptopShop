const express = require("express");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const adminRoute = require("./routes/admin.route");
const path = require("path");
const fs = require("fs");
const app = express();
const multer = require("multer");
const port = process.env.PORT || 3000;
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

app.use(authRoute);
app.use(productRoute);
app.use("/admin", adminRoute);
app.get("/upload", (req, res) => {
  res.render("upload");
});

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

app.get("/", (req, res) => {
  // res.send("hi");
  res.render("index", { title: "Home" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
