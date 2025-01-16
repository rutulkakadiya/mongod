const schema = require('../model/firstSchema');
const fs = require('fs'); 

module.exports.login = (req, res) => {
    res.render("login");
}

module.exports.loginToIndex = async (req, res) => {
    let admin = await schema.findOne({ email: req.body.email })

    if (admin) {
        if (admin.password == req.body.password) {
            res.cookie("adminData", admin)
            res.redirect("/index");
        }
        else {
            res.redirect("/")
        }
    }
    else {
        res.redirect("/")
    }
}


module.exports.index = (req, res) => {
    req.cookies.adminData ? res.render("index") : res.redirect("/");
}

module.exports.addAdmin = (req, res) => {
    req.cookies.adminData ? res.render("addAdmin"): res.redirect("/");
}

module.exports.viewAdmin = async (req, res) => {
    if(req.cookies.adminData){
        let data = await schema.find();
    res.render("viewAdmin", { data });
    }
    else{
        res.redirect("/");
    }
}

module.exports.addData = async (req, res) => {
    req.body.image = req.file.path;
    await schema.create(req.body)
        .then((data) => {
            res.redirect("/addAdmin");
        })
}

module.exports.deleteData = async (req, res) => {
    let singleData = await schema.findByIdAndDelete(req.query.id);
    fs.unlinkSync(singleData.image)
    await schema.findByIdAndDelete(req.query.id)
        .then((data) => {
            res.redirect("/viewAdmin")
        })
}

module.exports.editData = async (req, res) => {
    let singleData = await schema.findById(req.query.id)
    res.render("editAdmin", { singleData })
}

module.exports.updateData = async (req, res) => {
    let img = '';
    let singleData = await schema.findById(req.body.id);
    
    req.file ? (img = req.file.path) : (img = singleData.image);

    req.file && fs.unlinkSync(singleData.image);
    req.body.image = img;

    await schema.findByIdAndUpdate(req.body.id, req.body)
    res.redirect("/viewAdmin")
}

module.exports.logout = async (req,res)=>{
    res.clearCookie("adminData")
    res.redirect("/");
}