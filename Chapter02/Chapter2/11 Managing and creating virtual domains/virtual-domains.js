const express = require('express')
const vhost = require('vhost')
const app = express()

const app1 = express.Router()
const app2 = express.Router()

app1.get('/', (request, response, next) => {
	response.send('This is the main application.')
})

app2.get('/', (request, response, next) => {
	response.send('This is a second application.')
})

app.use(vhost('localhost', app1))
app.use(vhost('second.localhost', app2))

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
)
