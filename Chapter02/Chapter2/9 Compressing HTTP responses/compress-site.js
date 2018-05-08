const express = require('express')
const compression = require('compression')
const app = express()

app.use(compression({ level: 9, threshold: 0 }))

app.get('/', (request, response, next) => {
	response.send(`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>WebApp powered by ExpressJS</title>
	</head>
	<body>
		<section role="application">
			<h1>Hello! this page is compressed!</h1>
		</section>
	</body>
	</html>
	`)
	console.log(request.acceptsEncodings())
})

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
)
