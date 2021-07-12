var graphRouter = require('express').Router()
var Graph = require('../Graph')
var express = require('express')
graphRouter.use(express.raw({
	type: "application/octet-stream"
}))

graphRouter.put("/", (req, res) => {
	let accessToken = req.cookies.accessToken
	if (accessToken == null) res.redirect(process.env.FRONTEND)
	let filename = req.query.filename
	let graph = new Graph(accessToken)
	//let data = new Uint8Array()
	
	graph.api(`/me/drive/root:/${filename}:/content`, {
		method: "put",
		header: {
			"Content-Type": "application/octet-stream",
		},
		body:req.body
	})
		.then(console.log)
		.catch(console.log)
})

module.exports = graphRouter