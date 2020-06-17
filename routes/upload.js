const path = require("path");
const multer = require("multer");
var express = require('express');
const router = express.Router();


var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("destination")
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    console.log("filename", req)
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })


router.post('/', function(req, res, next) {
  console.log("function called", req.config.data);
  const file = req.myFile
  if (!file) {
    console.log("Error")
    res.send("req");
  }

})

module.exports = router;