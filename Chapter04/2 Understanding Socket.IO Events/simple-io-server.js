const io = require('socket.io')()
io.path('/socket.io')

const root = io.of('/')

root.on('connection', socket => {
	let counter = 0
	socket.on('time', () => {
		const currentTime = new Date().toTimeString()
		counter += 1
		socket.emit('got time?', currentTime, counter)
	})
})
io.listen(1337)
