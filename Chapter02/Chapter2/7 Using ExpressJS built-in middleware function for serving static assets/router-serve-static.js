const express = require('express')
const path = require('path')
const app = express()
const staticRouter = express.Router()

const assets = {
	first: path.join(__dirname, './public'),
	second: path.join(__dirname, './another-public')
}
staticRouter
	.use(express.static(assets.first))
	.use(express.static(assets.second))

app.use('/', staticRouter)

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
)
