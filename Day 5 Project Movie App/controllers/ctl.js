const path = require("path")
const schema = require('../model/firstSchema')
const fs = require("fs");

module.exports.index = async (req, res) => {
    let movieData = await schema.find();
    res.render("index", { movieData });
}

module.exports.addMovie = async (req, res) => {
    if (req.files['image']) {
        req.body.image = req.files['image'][0].path; // Path for movie image
    }
    if (req.files['bgImage']) {
        req.body.bgImage = req.files['bgImage'][0].path; // Path for movie background image
    }
    await schema.create(req.body)
        .then((data) => {
            res.redirect("/");
        })
}

module.exports.deleteMovie = async (req, res) => {
    let singleData = await schema.findByIdAndDelete(req.query.id);
    fs.unlinkSync(singleData.image);
    await schema.findByIdAndDelete(req.query.id)
        .then((data) => {
            res.redirect("/");
        })
}

module.exports.editMovie = async (req, res) => {
    let data = await schema.findById(req.query.id);
    res.render("editMovie", { data });
}

module.exports.updateMovie = async (req, res) => {

    let img = '';
    let singleData = await schema.findById(req.body.id);
    req.file ? (img = req.file.path) : (img = singleData.image);

    req.file && fs.unlinkSync(singleData.image);

    req.body.image = img;
    await schema.findByIdAndUpdate(req.body.id, req.body)
        .then((data) => {
            res.redirect("/");
        })
}

module.exports.detailMovie = async (req, res) => {
    const movieId = req.query.id;
    let movieData = await schema.find();
    let singleData = await movieData.find((e) => e.id === movieId);
    
    res.render("detailMovie", { singleData });
}