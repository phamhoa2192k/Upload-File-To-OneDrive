const express = require('express')
var app = express()

var signInRouter = require('./route/signIn')
app.use(express.json())
app.use('/signin', signInRouter)

app.listen(3000, () => console.log("App is running in port 3000..."))