const schema = require("../model/firstSchema")

module.exports.login = (req, res) => {
    res.render("login");
}

module.exports.loginToDashboard = async (req, res) => {
    res.redirect("/dashboard");
}

module.exports.logout = (req, res) => {
    res.clearCookie("adminData");
    res.redirect("/");
}

module.exports.dashboard = (req, res) => {
    res.render("dashboard");
}

module.exports.formBasic = (req, res) => {
    res.render("formBasic");
}

module.exports.tabels = async (req, res) => {
    let data = await schema.find();
    res.render("tabels", { data });

}

module.exports.addData = async (req, res) => {
    await schema.create(req.body)
        .then((data) => {
            res.redirect("/formBasic")
        })
}

module.exports.deleteData = async (req, res) => {
    await schema.findByIdAndDelete(req.query.id)
        .then((data) => {
            res.redirect("/tabels")
        })
}

module.exports.editData = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    res.render("editData", { singleData });
}

module.exports.updateData = async (req, res) => {
    await schema.findByIdAndUpdate(req.body.id, req.body)
        .then((data) => {
            res.redirect("/tabels");
        })
}

module.exports.profile = (req,res)=>{
    res.render("profile")
}