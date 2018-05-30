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
const User = mongoose.model('User', UserSchema)

const addUser = (firstName, lastName) => new User({
	firstName,
	lastName,
}).save()

const getUser = (id) => User.findById(id)
const removeUser = (id) => User.remove({ id })

connection.once('connected', async () => {
	try {
		// Create
		const newUser = await addUser('John', 'Smith')
		// Read
		const user = await getUser(newUser.id)
		// Update
		user.firstName = 'Jonny'
		user.lastName = 'Smithy'
		user.likes = [
			'cooking',
			'watching movies',
			'ice cream',
		]
		await user.save()
		console.log(JSON.stringify(user, null, 4))
		// Delete
		await removeUser(user.id)
	} catch (error) {
		console.dir(error.message, { colors: true })
	} finally {
		await connection.close()
	}
})
