const multer = require("multer");
const path = require('path');

const Storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads');
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: Storage,
}).fields([
    { name: "image", maxCount: 1 },     
    { name: "bgImage", maxCount: 1 }   
]);

module.exports = upload;