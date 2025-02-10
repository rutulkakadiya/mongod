const express = require("express");
const route = express.Router();
const ctl = require("../controller/ctl");
const upload = require("../middleware/multer");
const passport = require("../middleware/passport")

route.get("/", ctl.login);
route.get("/index", passport.checkAuth, ctl.index);
route.post("/loginToIndex",
    passport.authenticate('local', { failureRedirect: '/' }),
    ctl.loginToIndex);
route.get("/addAdminForm", passport.checkAuth, ctl.addAdminForm);

route.post("/addAdmin", upload, ctl.addAdmin)
route.get("/viewAdmin",passport.checkAuth, ctl.viewAdmin);

route.get("/deleteAdmin", ctl.deleteAdmin);
route.get("/editAdmin",passport.checkAuth, ctl.editAdmin);
route.post("/updateAdmin", upload, ctl.updateAdmin);

route.get("/profile", ctl.profile)
route.get("/logout", ctl.logout)

route.get("/changePassword", ctl.changePassword)
route.post("/changePassword", ctl.changePass)

route.get("/recoverPass", ctl.recoverPass);
route.post("/recoverPass1", ctl.recoverPassword);

route.post("/verifyOtp", ctl.verifyOtp);

module.exports = route;