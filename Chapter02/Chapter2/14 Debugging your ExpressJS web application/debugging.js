const express = require('express')
const app = express()

app.get('*', (request, response, next) => {
	response.send('Hello there!')
})

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
)
