const express = require('express');
const route = express.Router();
const ctl = require("../controllers/ctl");
const passport = require("../middleware/passport")

route.get("/", ctl.login)
route.get("/dashboard",passport.checkAuthentication, ctl.dashboard)
route.post("/loginToDashboard",passport.authenticate("local", {failureRedirect: "/"}), ctl.loginToDashboard)
route.get("/logout", ctl.logout)
route.get("/formbasic",passport.checkAuthentication, ctl.formBasic )
route.get("/tabels",passport.checkAuthentication,ctl.tabels )
route.post("/addData", ctl.addData)
route.get("/deleteData", ctl.deleteData)
route.get("/editData", ctl.editData)
route.post("/updateData", ctl.updateData)

module.exports = route;