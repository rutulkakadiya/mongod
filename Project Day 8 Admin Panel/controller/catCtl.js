const { log } = require("console");
const schema = require("../model/catSchema");
const path = require("path");

module.exports.addCat = (req, res) => {
    res.render("addCat")
}

module.exports.addCategory = async (req, res) => {
    req.body.catImage = req.files.catImage[0].path;

    await schema.create(req.body)
        .then(() => {
            res.redirect("/category/addCat");
        })
}

module.exports.viewCat = async (req, res) => {
    let data = await schema.find({})
    res.render("viewCat", { data });
}

module.exports.deleteCat = async (req, res) => {
    await schema.findByIdAndDelete(req.query.id)
    .then(()=>{
        res.redirect("/category/viewCat")
    })
}