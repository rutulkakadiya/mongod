const express = require("express");
const route = express.Router();
const ctl = require("../controller/catCtl");
const upload = require("../middleware/multer");
const passport = require("../middleware/passport");

route.get("/addCat", passport.checkAuth, ctl.addCat);
route.post("/addCat", upload, ctl.addCategory);

route.get("/viewCat", ctl.viewCat);
route.get("/deleteCat", ctl.deleteCat);

module.exports = route;