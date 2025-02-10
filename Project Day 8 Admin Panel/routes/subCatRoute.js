const express = require("express");

const route = express.Router();
const ctl = require("../controller/subCatCtl");

route.get("/addSubCat", ctl.addSubCat)

module.exports = route;