const express = require("express");
const authRoute = require("./routes/auth.route");
const productRoute = require("./routes/product.route");
const adminRoute = require("./routes/admin.route");
const session=require('express-session')
const connection=require('./utils/db')
const bcrypt=require('bcryptjs')
// const passport=require('./utils/passportConfig')
const flash=require('flash')
const app = express();
const MySQLStore = require("express-mysql-session")(session)
const port = process.env.PORT || 3000;
require('dotenv').config()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("uploads"));
// mysql connection
app.use(authRoute);
app.use(productRoute);
app.use("/admin", adminRoute);

const store=new MySQLStore({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
  clearExpired:true,
  checkExpirationInterval:90000,
  expiration:8640000
})

app.use(session({
  secret: 'maybeIhaveTogetAniceSecretForThisAPp', //next time make this in your env file
  resave: false,
  saveUninitialized: false,
  store: store
}));
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(flash())



app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.post('/login',async(req,res)=>{
  const {email,password}=req.body
  try {
    if(email&&password){
      const sql=`SELECT * FROM users WHERE email=?`
      const[rows,fields]=await connection.query(sql,[email])
      if(rows.length===0){
        console.log('no such user');
      }else{
        const verify=await bcrypt.compare(password,rows[0].password)
        console.log(verify);
        if(verify){
          req.session.user=rows[0].role
         return res.redirect('/product');
        }else{
         return res.redirect('/login')
        }
      }
    }else{
      return res.send('all fields required')
    }
  } catch (error) {
    console.log(error)
    res.status(404).send('wahala signin in oo')
  }
})

app.get('/logout',(req,res)=>{
  try {     
    req.session.destroy(err=>{
        if(err){console.log(err);}
        else{
            
          return res.redirect('/')}
    });
    
} catch (error) {
    console.log(error);
}
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  return res.send('Internal server error');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
