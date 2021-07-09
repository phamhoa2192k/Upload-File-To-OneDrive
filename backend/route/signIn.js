const msalConfig = require('../config')
const msal = require('@azure/msal-node')
const User = require('../DAO/User')
var msalClientApp = new msal.ConfidentialClientApplication(msalConfig)
var signInRouter = require('express').Router()

signInRouter.get('/', (req, res) => {
	urlParameters = {
		scopes: process.env.OAUTH_SCOPES.split(','),
		redirectUri: process.env.OAUTH_REDIRECT_URI
	}

	msalClientApp.getAuthCodeUrl(urlParameters).then((authCodeUrl) => {
		//console.log(authCodeUrl)
		res.json(authCodeUrl)
	}).catch((error) => console.log(JSON.stringify(error)));

})

signInRouter.get('/auth', (req, res) => {
	const tokenRequest = {
		scopes: process.env.OAUTH_SCOPES.split(','),
		redirectUri: process.env.OAUTH_REDIRECT_URI,
		code: req.query.code
	};
	msalClientApp.acquireTokenByCode(tokenRequest).then(async (response) => {
		let user = await User.findOne({"uniqueId": response.uniqueId})
		if(user == null) {
			user = new User(response)
			user.save(console.log)
		}
		res.cookie("uniqueId", response.uniqueId)
		res.redirect("http://localhost:3000")
		
	}).catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
})

module.exports = signInRouter