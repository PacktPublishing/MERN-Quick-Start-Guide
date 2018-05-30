const express = require('express')
const path = require('path')
const app = express()

app.use('/lib', express.static(
	path.join(__dirname, 'node_modules', 'redux', 'dist')
))
app.get('/', (req, res) => {
	res.sendFile(path.join(
		__dirname,
		'time-travel.html',
	))
})
app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
)
