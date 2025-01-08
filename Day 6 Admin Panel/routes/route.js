const express = require('express');
const route = express.Router();
const ctl = require("../controllers/ctl");

route.get("/", ctl.index);
route.get("/formbasic", ctl.formBasic )
route.get("/tabels", ctl.tabels )

module.exports = route;

