const mongoose = require('mongoose')
const { connection, Schema } = mongoose

mongoose.connect(
	'mongodb://test:test@localhost:7331/test'
).catch(console.error)

const UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
})
UserSchema.pre('init', async function preInit() {
	console.log('A document is going to be initialized.')
})
UserSchema.post('init', async function postInit() {
	console.log('A document was initialized.')
})
UserSchema.pre('validate', async function preValidate() {
	console.log('A document is going to be validated.')
})
UserSchema.post('validate', async function postValidate() {
	console.log('All validation rules were executed.')
})
UserSchema.pre('save', async function preSave() {
	console.log('Preparing to save the document')
})
UserSchema.post('save', async function postSave() {
	console.log(`A doc was saved id=${this.id}`)
})
UserSchema.pre('remove', async function preRemove() {
	console.log(`Doc with id=${this.id} will be removed`)
})
UserSchema.post('remove', async function postRemove() {
	console.log(`Doc with id=${this.id} was removed`)
})

const User = mongoose.model('User', UserSchema)

connection.once('connected', async () => {
	try {
		const user = new User({
			firstName: 'John',
			lastName: 'Smith',
		})
		await user.save()
		await User.findById(user.id)
		await user.remove()
	} catch (error) {
		console.dir(error.message, { colors: true })
	} finally {
		await connection.close()
	}
})
