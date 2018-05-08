// Writing Router-level Middleware functions
const express = require('express')
const app = express()

const router = express.Router()
router.use((request, response, next) => {
	if (!request.query.id) {
		next('router') // Next, out of Router
	} else {
		next() // Next, in Router
	}
})
router.get('/', (request, response, next) => {
	const id = request.query.id
	response.send(`You specified a user ID => ${id}`)
})

app.get('/', router, (request, response, next) => {
	response
		.status(400)
		.send('A user ID needs to be specified')
})

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
)
