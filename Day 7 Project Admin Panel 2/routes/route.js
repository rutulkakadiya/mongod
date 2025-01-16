const express = require('express');
const route = express.Router();
const ctl = require("../controller/ctl");
const upload = require('../middleware/multer');

route.get("/",ctl.login);
route.get("/index",ctl.index);
route.post("/loginToIndex",ctl.loginToIndex);
route.get("/addAdmin", ctl.addAdmin)
route.get("/viewAdmin", ctl.viewAdmin)
route.post("/addData", upload, ctl.addData)
route.get("/deleteData", ctl.deleteData)
route.get("/editData", ctl.editData)
route.post("/updateData",upload, ctl.updateData)
route.get("/logout", ctl.logout);

module.exports = route;