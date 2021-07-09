const User = require('../DAO/User')

var userRouter = require('express').Router()

userRouter.get('/get-user', async (req, res) => {
	let uniqueId = req.query.uniqueId
	let user = await User.findOne({"uniqueId": uniqueId})
	if(user == null) res.status(404)
	else res.json({
		name: user.idTokenClaims.name,
		email: user.idTokenClaims.preferred_username
	})
})

module.exports = userRouter