const express = require("express");
const port = 1008;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

const db = require("./config/db");

app.use("/", require("./routes/route"));

app.listen(port, (err)=>{
    err ? console.log(err): console.log("Server started");
})