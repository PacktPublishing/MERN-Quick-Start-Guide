const path = require('path')
const express = require('express')
const io = require('socket.io')()
const app = express()

io.path('/socket.io')

app.get('/', (req, res) => {
	res.sendFile(path.resolve(
		__dirname,
		'io-express-view.html',
	))
})
io.of('/').on('connection', (socket) => {
	socket.emit('welcome', 'Hello from Server!')
})
io.attach(app.listen(1337, () => {
	console.log(
		'HTTP Server and Socket.IO running on port 1337'
	)
}))
