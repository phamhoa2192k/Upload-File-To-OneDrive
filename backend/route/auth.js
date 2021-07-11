const authConfig = require('../config').auth
const msal = require('@azure/msal-node')
const User = require('../DAO/User')
var msalClientApp = new msal.ConfidentialClientApplication(authConfig)
var authRouter = require('express').Router()

authRouter.get('/', (req, res) => {
     urlParameters = {
          scopes: process.env.OAUTH_SCOPES.split(','),
          redirectUri: process.env.OAUTH_REDIRECT_URI
     }
     msalClientApp.getAuthCodeUrl(urlParameters).then((authCodeUrl) => {
          //console.log(authCodeUrl)
          res.json(authCodeUrl)
     }).catch((error) => console.log(JSON.stringify(error)));
})

authRouter.get('/auth', (req, res) => {
     const tokenRequest = {
          scopes: process.env.OAUTH_SCOPES.split(','),
          redirectUri: process.env.OAUTH_REDIRECT_URI,
          code: req.query.code
     };
     msalClientApp.acquireTokenByCode(tokenRequest).then(async (response) => {
          let user = await User.findOne({ accessToken: response.accessToken })
          if (user == null) {
               user = new User(response)
               user.save(console.log)
          }
          res.cookie("accessToken", response.accessToken)
          res.redirect(process.env.FRONTEND_SERVER)
     }).catch((error) => {
          console.log(error);
          res.status(500).send(error);
     });
})

module.exports = authRouter