const schema = require("../model/firstSchema")

module.exports.firstRender = async (req, res) => {
    let data = await schema.find();
    res.render("index", { data })
}

module.exports.addData = async (req, res) => {
    await schema.create(req.body)
        .then((data) => {
            res.redirect("/");
        })
}