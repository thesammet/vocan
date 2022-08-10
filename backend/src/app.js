const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const wordRouter = require('./routers/word')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(wordRouter)

module.exports = app