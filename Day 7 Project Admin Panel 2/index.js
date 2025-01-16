const express = require('express');
const port = 1008;
const app = express();
const db = require('./config/db');
const cookie = require("cookie-parser")
const path = require('path');

app.set("view engine", "ejs");  
app.use(express.urlencoded());
app.use(express.static('public'))
app.use(cookie());
app.use("/uploads",express.static(path.join(__dirname, "uploads")))

app.use("/", require("./routes/route"))

app.listen(port , (err)=>{
    err ? console.log(err) : console.log("Server started on" + port);
})