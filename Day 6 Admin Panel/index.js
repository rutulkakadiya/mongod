const express = require('express');
const port = 1008;
const db =require('./config/db');
const app = express();
const cookie = require('cookie-parser');
const passport = require('./middleware/passport')
const session = require('express-session')

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookie());
app.use(
    session({
    name: "local",
    secret: 'rk',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 }
  }))

  app.use(passport.initialize());
  app.use(passport.session());

app.use("/", require("./routes/route"));

app.listen(port, (err)=>{
    err ? console.log(err): console.log("Server started on "+ port);
})