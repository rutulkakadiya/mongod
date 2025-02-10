const express = require('express');
const port = 1008;
const db = require("./config/db")
const path = require("path")
const app = express();
const passport = require("./middleware/passport")
const session = require("express-session")

app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(express.urlencoded())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(
    session({
        name: "local",
        secret: "rnw",
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 100 * 100 * 60 }
    })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.AuthenticatedUser)

app.use("/", require("./routes/route"));
app.use("/category", require("./routes/catRoute"))
app.use("/subCategory", require("./routes/subCatRoute"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server started " + port);
})