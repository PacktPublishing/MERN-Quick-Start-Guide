const EventEmitter = require('events')

const NS_PER_SEC = 1e9
const NS_PER_MS = 1e6

class Timer extends EventEmitter {
	start() {
		this.startTime = process.hrtime()
		this.emit('start')
	}
	stop() {
		const diff = process.hrtime(this.startTime)
		this.emit(
			'stop',
			(diff[0] * NS_PER_SEC + diff[1]) / NS_PER_MS,
		)
	}
}

const tasks = new Timer()

tasks.on('start', () => {
	let res = 1
	for (let i = 1; i < 100000; i++) {
		res *= i
	}
	tasks.stop()
})
tasks.on('stop', (time) => {
	console.log(`Task completed in ${time}ms`)
})

tasks.start()
