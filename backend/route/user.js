const User = require('../DAO/User')
var cors = require('cors')
var userRouter = require('express').Router()

userRouter.get('/get-user', async (req, res) => {
	let accessToken = req.cookies.accessToken
	let user = await User.findOne({"accessToken": accessToken})
	if(user == null) res.status(404)
	else res.json({
		name: user.idTokenClaims.name,
		email: user.idTokenClaims.preferred_username
	})
})




module.exports = userRouter