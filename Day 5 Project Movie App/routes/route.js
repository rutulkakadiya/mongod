const express = require('express');
const route = express.Router();
const ctl = require('../controllers/ctl')
const upload = require('../middleware/multer')

route.get("/", ctl.index);
route.post("/addMovie", upload, ctl.addMovie);
route.get("/deleteMovie", ctl.deleteMovie);
route.get("/editMovie", ctl.editMovie);
route.post("/updateMovie", upload, ctl.updateMovie);
route.get("/detailMovie", upload, ctl.detailMovie);

module.exports = route;