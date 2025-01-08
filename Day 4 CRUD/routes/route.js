const express = require("express");
const route = express.Router();
const firstRender = require("../controllers/ctl");

route.get("/", firstRender.firstRender);
route.post("/addData", firstRender.addData);

module.exports = route;