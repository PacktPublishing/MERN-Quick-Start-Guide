const { connection, Schema } = require('mongoose')
const crypto = require('crypto')

const UserSchema = new Schema({
	username: {
		type: String,
		minlength: 4,
		maxlength: 20,
		required: [true, 'username field is required.'],
		validate: {
			validator: function (value) {
				return /^[a-zA-Z]+$/.test(value)
			},
			message: '{VALUE} is not a valid username.',
		},
	},
	password: String,
})

UserSchema.static('login', async function(usr, pwd) {
	const hash = crypto.createHash('sha256')
		.update(String(pwd))
	const user = await this.findOne()
		.where('username').equals(usr)
		.where('password').equals(hash.digest('hex'))
	if (!user) throw new Error('Incorrect credentials.')
	delete user.password
	return user
})
UserSchema.static('signup', async function(usr, pwd) {
	if (pwd.length < 6) {
		throw new Error('Pwd must have more than 6 chars')
	}
	const hash = crypto.createHash('sha256').update(pwd)
	const exist = await this.findOne()
		.where('username')
		.equals(usr)
	if (exist) throw new Error('Username already exists.')
	const user = this.create({
		username: usr,
		password: hash.digest('hex'),
	})
	return user
})

UserSchema.method('changePass', async function(pwd) {
	if (pwd.length < 6) {
		throw new Error('Pwd must have more than 6 chars')
	}
	const hash = crypto.createHash('sha256').update(pwd)
	this.password = hash.digest('hex')
	return this.save()
})

module.exports = connection.model('User', UserSchema)