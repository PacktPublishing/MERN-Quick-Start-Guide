const http = require('http')
const fs = require('fs')
const path = require('path')
const io = require('socket.io')()

const app = http.createServer((req, res) => {
	if (req.url === '/') {
		fs.readFile(
			path.resolve(__dirname, 'nsp-client.html'),
			(err, data) => {
				if (err) {
					res.writeHead(500)
					return void res.end()
				}
				res.writeHead(200)
				res.end(data)
			}
		)
	} else {
		res.writeHead(403)
		res.end()
	}
})

io.path('/socket.io')

io.of('/en').on('connection', (socket) => {
	socket.on('getData', () => {
		socket.emit('data', {
			title: 'English Page',
			msg: 'Welcome to my Website',
		})
	})
})
io.of('/es').on('connection', (socket) => {
	socket.on('getData', () => {
		socket.emit('data', {
			title: 'Página en Español',
			msg: 'Bienvenido a mi sitio Web',
		})
	})
})
io.attach(app.listen(1337, () => {
	console.log(
		'HTTP Server and Socket.IO running on port 1337'
	)
}))
