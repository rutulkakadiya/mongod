const express = require("express");
const route = express.Router();
const ctl = require("../controller/ctl")

route.get("/", ctl.login);
route.post("/loginUser", ctl.loginUser);
route.get("/register", ctl.register);
route.post("/registerUser", ctl.registerUser);
route.get("/dashboard", ctl.dashboard);

route.post("/addTask", ctl.addTask);
route.get("/deleteTask", ctl.deleteTask);

module.exports = route;