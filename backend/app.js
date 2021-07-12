require('dotenv').config()
const express = require('express')
const cors = require('cors')
var config = require('./config')
var cookieParser = require('cookie-parser')
var app = express()
var authRouter = require('./route/auth')
var userRouter = require('./route/user')
var fileRouter = require('./route/file')

app.use(cors(config.corsConfig));
app.use(cookieParser())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/file', fileRouter)

app.listen(3001, () => console.log("App is running in port 3001..."))