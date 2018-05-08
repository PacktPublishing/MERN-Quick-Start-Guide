const express = require('express')
const loggerMiddleware = require('./middleware-logger')
const app = express()

app.use(loggerMiddleware({
	enable: true,
}))

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
)
