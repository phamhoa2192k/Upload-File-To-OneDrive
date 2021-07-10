require('dotenv').config()

const express = require('express')
const cors = require('cors')

var app = express()
var signInRouter = require('./route/signIn')
var userRouter = require('./route/user')
var fileRouter = require('./route/file')
app.use(cors({ origin: true }));
app.use(express.json())
app.use('/signin', signInRouter)
app.use('/user', userRouter)
app.use('/file', fileRouter)
app.listen(3001, () => console.log("App is running in port 3001..."))