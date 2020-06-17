const crypto = require('crypto');
var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
var encryptionHelper = require("./safe.js");
var requestGetApiTest = require('./requestGetApiTest.js');
var algorithm = encryptionHelper.CIPHERS.AES_256;

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log("testing encryption and decryption");

	// let buff = fs.readFileSync('test.png', { encoding: 'base64' });
	// //let base64data = buff.toString('base64');

	
	// console.log("text is: " + buff);

	// encryptionHelper.getKeyAndIV("1234567890abcdefghijklmnopqrstuv", function(data) { //using 32 byte key

	// 	console.log("got key and iv buffers");

	// 	var encText = encryptionHelper.encryptText(algorithm, data.key, data.iv, base64data, "base64");

	// 	console.log("encrypted text = " + encText);

	// 	var decText = encryptionHelper.decryptText(algorithm, data.key, data.iv, encText, "base64");

	// 	console.log("decrypted text = " + decText);
	// });
	//requestGetApiTest(req, res)

 res.render('index', { title: 'Express' });
});

module.exports = router;
