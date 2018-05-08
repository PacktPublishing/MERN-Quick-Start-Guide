const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const uuid = require('uuid/v1')
const app = express()

// Generate Random IDs
const suid = uuid()

// Parse application/csp-report as JSON
app.use(bodyParser.json({
	type: ['json', 'application/csp-report'],
}))

// CSP - Content Security Policy
app.use(helmet.contentSecurityPolicy({
	directives: {
		// By default do not allow unless whitelisted
		defaultSrc: [`'none'`],
		 // Only allow scripts with this nonce
		scriptSrc: [`'nonce-${suid}'`],
		reportUri: '/csp-violation',
	}
}))
app.post('/csp-violation', (request, response, next) => {
	const { body } = request
	if (body) {
		console.log('CSP Report Violation:')
		console.dir(body, { colors: true, depth: 5 })
	}
	response.status(204).send()
})
// Disable DNS Prefetch Control
app.use(helmet.dnsPrefetchControl({ allow: false }))
// Frameguard disable loading inside an iframe
app.use(helmet.frameguard({ action: 'deny' }))
// Replace Powered-By header by a fake one
app.use(helmet.hidePoweredBy({
	setTo: 'Django/1.2.1 SVN-13336',
}))
// Disable IE untrusted executions on context of this site
app.use(helmet.ieNoOpen())
// Disable guessing Mimetype in browsers
app.use(helmet.noSniff())
// Hide referrer header for third-party but not local
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
// Prevent Reflected XSS attacks
app.use(helmet.xssFilter())


// Sample Web App
app.get('/', (request, response, next) => {
	response.send(`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Web App</title>
	</head>
	<body>
		<span id="txtlog"></span>
		<img alt="Evil Picture" src="http://evil.com/pic.jpg">
		<script>
			alert('This does not get executed!')
		</script>
		<script src="http://evil.com/evilstuff.js"></script>
		<script nonce="${suid}">
			document
				.getElementById('txtlog')
				.innerText = 'Hello World!'
		</script>
	</body>
	</html>
	`)
})

app.listen(
	1337,
	() => console.log('Web Server running on port 1337'),
)
