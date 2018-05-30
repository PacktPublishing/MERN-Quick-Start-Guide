const mongoose = require('mongoose')
const { connection, Schema } = mongoose

mongoose.connect(
	'mongodb://test:test@localhost:7331/test'
).catch(console.error)

const UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
})
UserSchema.pre('insertMany', async function prMany() {
	console.log('Preparing docs...')
})
UserSchema.post('insertMany', async function psMany(docs) {
	console.log('The following docs were created:\n', docs)
})
const User = mongoose.model('User', UserSchema)

connection.once('connected', async () => {
	try {
		await User.insertMany([
			{ firstName: 'Leo', lastName: 'Smith' },
			{ firstName: 'Neo', lastName: 'Jackson' },
		])
	} catch (error) {
		console.dir(error, { colors: true })
	} finally {
		await connection.close()
	}
})
