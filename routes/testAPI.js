var express = require('express');
var router = express.Router();
const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto');
var { Crypt } = require('hybrid-crypto-js');
var private_key = "";

function validateName(name){
	return (/^[a-zA-Z ]*$/.test(name));
}

function validateEmail(email){
	return (/^[A-Z0-9a-z\.\_\%\+\-]+\@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,6}$/.test(email));
}

function validatePhone(phone){
	return (/^(\d{10})?$/).test(phone);
}

router.get('/', function(req, res) {
	//generate a key pair RSA type encryption with a .pem format
	const { publicKey, privateKey } = generateKeyPairSync('rsa', {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: 'spki',
			format: 'pem'
		},
		privateKeyEncoding: {
			type: 'pkcs8',
			format: 'pem',

		}
	});
	private_key = privateKey;
	res.send({"public-key":publicKey, "private-key": privateKey});
})

router.post('/', function(req, res) {
	var payload = req.body.payload;
	// Basic initialization
	var crypt = new Crypt();
	console.log("payload", payload)
	// Increase amount of entropy
	var entropy = 'Random string, integer or float';
	var crypt = new Crypt({ entropy: entropy });
	
	var decrypted = crypt.decrypt(private_key, payload);
	console.log("decrypted", decrypted.message);
	var data = JSON.parse(decrypted.message);
	if (!validateName(data.name) || !validateEmail(data.email) || !validatePhone(data.phone)) {
		res.status(400).send('Validation Error');
	}
	else {
		res.send('API is working properly');
	}
});

module.exports = router;