const express = require('express')
const path = require('path')
const app = express()
const publicDir = path.join(__dirname, './public')

app.use('/', express.static(publicDir))

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
)