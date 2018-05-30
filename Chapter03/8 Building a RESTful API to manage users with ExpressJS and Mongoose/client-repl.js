const repl = require('repl')
const util = require('util')
const vm = require('vm')
const fetch = require('node-fetch')
const { Headers } = fetch

let cookie = null

const query = (path, ops) => {
	return fetch(`http://localhost:1337/users/${path}`, {
		method: ops.method,
		body: ops.body,
		credentials: 'include',
		body: JSON.stringify(ops.body),
		headers: new Headers({
			...(ops.headers || {}),
			cookie,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}),
	}).then(async (r) => {
		cookie = r.headers.get('set-cookie') || cookie
		return {
			data: await r.json(),
			status: r.status,
		}
	}).catch(error => error)
}

const signup = (username, password) => query('/signup', {
	method: 'POST',
	body: { username, password },
})
const login = (username, password) => query('/login', {
	method: 'POST',
	body: { username, password },
})
const logout = () => query('/logout', {
	method: 'POST',
})
const getProfile = () => query('/profile', {
	method: 'GET',
})
const changePassword = (password) => query('/changepass', {
	method: 'PUT',
	body: { password },
})
const deleteProfile = () => query('/delete', {
	method: 'DELETE',
})

const replServer = repl.start({
	prompt: '> ',
	ignoreUndefined: true,
	async eval(cmd, context, filename, callback) {
		const script = new vm.Script(cmd)
		const is_raw = process.stdin.isRaw
		process.stdin.setRawMode(false)
		try {
			const res = await Promise.resolve(
				script.runInContext(context, {
					displayErrors: false,
					breakOnSigint: true,
				})
			)
			callback(null, res)
		} catch (error) {
			callback(error)
		} finally {
			process.stdin.setRawMode(is_raw)
		}
	},
	writer(output) {
		return util.inspect(output, {
			breakLength: process.stdout.columns,
			colors: true,
			compact: false,
		})
	}
})
replServer.context.api = {
	signup,
	login,
	logout,
	getProfile,
	changePassword,
	deleteProfile,
}
