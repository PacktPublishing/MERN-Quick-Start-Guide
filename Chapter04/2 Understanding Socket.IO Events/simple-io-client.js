const io = require('socket.io-client')
const clientSocket = io('http://localhost:1337', {
	path: '/socket.io',
})
clientSocket.on('connect', () => {
	for (let i = 1; i <= 5; i++) {
		clientSocket.emit('time')
	}
})
clientSocket.on('got time?', (time, counter) => {
	console.log(counter, time)
})
