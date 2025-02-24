const schema = require("../schema/firstSchema");
const taskSchema = require("../schema/taskSchema");
module.exports.login = (req, res) => {
    res.render("login");
}

module.exports.register = (req, res) => {
    res.render("register");
}

module.exports.registerUser = async (req, res) => {
    await schema.create(req.body)
        .then(() => {
            res.render("login")
        })
}

module.exports.loginUser = async (req, res) => {
    let user = await schema.findOne({ email: req.body.email })

    if (!user) {
        res.redirect("/");
    }
    else {
        if (req.body.password == user.password) {

            res.redirect("/dashboard");
        } else {
            console.log("Password not match");
        }
    }

}

module.exports.dashboard = async (req, res) => {
    let task = await taskSchema.find({})
    res.render("dashboard", {task});
}

module.exports.addTask = async (req,res)=>{
    await taskSchema.create(req.body)
    .then(()=>{
        res.redirect("/dashboard")
    })
}

module.exports.deleteTask = async (req,res)=>{
    await taskSchema.findByIdAndDelete(req.query.id)

    .then(()=>{
        res.redirect("/dashboard");
    })
}