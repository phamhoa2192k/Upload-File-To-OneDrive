const msalConfig = require('../config')
var msalClientApp = require('@azure/msal-node').ConfidentialClientApplication(msalConfig)
var signInRouter = require('express').Router()

signInRouter.get('/', (req, res) => {
	urlParameters = {
		scopes: process.env.OAUTH_SCOPES.split(','),
		redirectUri: process.env.OAUTH_REDIRECT_URI
	}

	msalClientApp.getAuthCodeUrl(urlParameters).then((authCodeUrl) => {
		res.redirect(authCodeUrl);
	}).catch((error) => console.log(JSON.stringify(error)));
})


signInRouter.get('/auth', (req, res) => {

	const tokenRequest = {
		scopes: process.env.OAUTH_SCOPES.split(','),
		redirectUri: process.env.OAUTH_REDIRECT_URI,
		code: req.query.code
	};

	msalClientApp.acquireTokenByCode(tokenRequest).then((response) => {
		//console.log("Successfully acquired token using Authorization Code.");
		res.json(response)
	}).catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
})

module.exports = signInRouter