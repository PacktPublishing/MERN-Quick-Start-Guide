const express = require('express')
const app = express()

app.get('/', (request, response, next) => {
	try {
		throw new Error('Oh no!, something went wrong!')
	} catch (err) {
		next(err)
	}
})

app.use((error, request, response, next) => {
	response.end(error.message)
})

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
)
