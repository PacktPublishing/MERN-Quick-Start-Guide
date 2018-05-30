const express = require('express')
const app = express()

app.get('/time', (req, res) => {
	setTimeout(() => {
		res.send(new Date().toTimeString())
	}, 2000)
})
app.get('/date', (req, res) => {
	setTimeout(() => {
		res.destroy(new Error('Internal Server Error'))
	}, 2000)
})
app.listen(
	1337,
	() => console.log('API server running on port 1337'),
)
