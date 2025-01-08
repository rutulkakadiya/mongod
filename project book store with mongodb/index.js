const express = require("express")
const port = 1008;
const multer = require("multer")
const app = express();
const schema = require("./model/firstSchema")
app.use(express.urlencoded());
const db = require("./config/dataBase")
const path = require("path")
const fs = require("fs")
app.set("view engine", "ejs");
app.use("/uploads" , express.static(path.join(__dirname, "uploads")))

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: Storage }).single("image");

app.get("/", async (req, res) => {
    let bookData = await schema.find();
    res.render("bookStore", { bookData });
})

app.post("/addData", upload, async (req, res) => {
    req.body.image = req.file.path;

    await schema.create(req.body)
        .then(data => {
            res.redirect("/");
        })
})

app.get("/deleteData", async (req, res) => {

    let singleData = await schema.findByIdAndDelete(req.query.id)
    fs.unlinkSync(singleData.image) 
    await schema.findByIdAndDelete(req.query.id)   
    .then((data) => {
            res.redirect("/");
        })
})

app.get("/editData", async (req, res) => {
    let data = await schema.findById(req.query.id)
    res.render("editBook", { data })
})

app.post("/updateData",upload, async (req, res) => {
    let img = ""
    let singleData = await schema.findById(req.body.id)
    req.file ? (img = req.file.path) : (img = singleData.image)
    req.file && fs.unlinkSync(singleData.image);

    req.body.image = img;
    await schema.findByIdAndUpdate(req.body.id, req.body).then((data) => {
        res.redirect("/")
    })
})


app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server started on " + port);
})