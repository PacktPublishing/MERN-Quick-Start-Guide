const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
const DECREMENT_COUNTER = 'DECREMENT_COUNTER'

const increment = (by) => ({
	type: INCREMENT_COUNTER,
	by,
})
const decrement = (by) => ({
	type: DECREMENT_COUNTER,
	by,
})

const reduced = [
	increment(10),
	decrement(5),
	increment(3),
].reduce((accumulator, action) => {
	switch (action.type) {
		case INCREMENT_COUNTER:
			return accumulator + action.by
		case DECREMENT_COUNTER:
			return accumulator - action.by
		default:
			return accumulator
	}
}, 0)

console.log(reduced)
