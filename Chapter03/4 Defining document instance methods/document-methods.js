const mongoose = require('mongoose')
const { connection, Schema } = mongoose

mongoose.connect(
	'mongodb://test:test@localhost:7331/test'
).catch(console.error)

const UserSchema = new Schema({
	firstName: String,
	lastName: String,
	likes: [String],
})
UserSchema.method('setFullName', function setFullName(v) {
	const fullName = String(v).split(' ')
	this.lastName = fullName[0] || ''
	this.firstName = fullName[1] || ''
})
UserSchema.method('getFullName', function getFullName() {
	return `${this.lastName} ${this.firstName}`
})
UserSchema.method('loves', function loves(stuff) {
	this.likes.push(stuff)
})
UserSchema.method('dislikes', function dislikes(stuff) {
	this.likes = this.likes.filter(str => str !== stuff)
})

const User = mongoose.model('User', UserSchema)

connection.once('connected', async () => {
	try {
		// Create
		const user = new User()
		user.setFullName('Huang Jingxuan')
		user.loves('kitties')
		user.loves('strawberries')
		user.loves('snakes')
		await user.save()
		// Update
		const person = await User.findOne()
			.where('firstName', 'Jingxuan')
			.where('likes').in(['snakes', 'kitties'])
		person.dislikes('snakes')
		await person.save()
		// Display
		console.log(person.getFullName())
		console.log(JSON.stringify(person, null, 4))
		// Remove
		await user.remove()
	} catch (error) {
		console.dir(error.message, { colors: true })
	} finally {
		await connection.close()
	}
})
