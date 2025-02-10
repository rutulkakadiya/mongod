const schema = require("../model/adminSchema")
const fs = require("fs")
const mailer = require("../middleware/mailer");

module.exports.login = (req, res) => {
    res.render("login")
}

module.exports.index = (req, res) => {
    res.render("index");
}

module.exports.loginToIndex = (req, res) => {
    res.redirect("/index")
}

module.exports.addAdminForm = (req, res) => {
    res.render("addAdminForm")
}

module.exports.addAdmin = async (req, res) => {
    req.body.image = req.files.image[0].path;
    await schema.create(req.body)
        .then((data) => {
            res.redirect("/addAdminForm")
        })
}

module.exports.viewAdmin = async (req, res) => {
    let data = await schema.find({})
    res.render("viewAdmin", { data })
}

module.exports.deleteAdmin = async (req, res) => {
    let singleData = await schema.findByIdAndDelete(req.query.id)
    fs.unlinkSync(singleData.image)
    await schema.findByIdAndDelete(req.query.id)
        .then(() => {
            res.redirect("/viewAdmin");
        })
}

module.exports.editAdmin = async (req, res) => {
    let editData = await schema.findById(req.query.id)
    res.render("editAdmin", { editData })
}

module.exports.updateAdmin = async (req, res) => {
    let img = '';
    let singleData = await schema.findById(req.body.id)

    req.file ? (img = req.file.path) : (img = singleData.image);

    req.file && fs.unlinkSync(singleData.image)
    req.body.image = img;
    console.log(img);

    await schema.findByIdAndUpdate(req.body.id, req.body)
        .then(() => {
            res.redirect("/viewAdmin")
        })
}

module.exports.profile = (req, res) => {
    res.render("profile")
}

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

module.exports.changePassword = (req, res) => {
    res.render("changePassword");
}

module.exports.changePass = async (req, res) => {
    console.log(req.body);
    let user = req.user;
    console.log(user);

    if (user.password == req.body.oldPassword) {
        if (req.body.oldPassword != req.body.newPassword) {
            if (req.body.newPassword == req.body.confirmPassword) {
                let admin = await schema.findByIdAndUpdate(user.id, { password: req.body.newPassword })
                admin && res.redirect("/");
            } else {
                console.log("New password and confirm password must be same");
            }
        } else {
            console.log("old password and new password must be different");
        }
    } else {
        console.log("old password is wrong");
    }
}

module.exports.recoverPass = (req, res) => {
    res.render("recoverPass");
}

module.exports.recoverPassword = async (req, res) => {
    let admin = await schema.findOne({email: req.body.email})
    console.log(admin);
    
    if(!admin){
        res.redirect("/");
    }

    let otp = Math.floor(Math.random() * 10000 + 90000);
    mailer.sendOtp(req.body.email, otp)

    req.session.otp = otp;
    req.session.adminData = admin;

    res.render("verifyOtp");
}

module.exports.verifyOtp = async (req,res)=>{
    let otp = req.session.otp;
    let admin = req.session.adminData;

    if(req.body.otp == otp){
        if(req.body.newPassword == req.body.confirmPassword){
            let adminData = await schema.findByIdAndUpdate(admin._id, {password: req.body.newPassword})
            adminData && res.redirect("/");
        }
        else{
            console.log("Error");
        }
    }else{
        res.redirect("/")
    }
}