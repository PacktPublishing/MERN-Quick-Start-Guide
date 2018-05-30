const {
	createStore,
	combineReducers,
	bindActionCreators,
} = require('redux')

const acceptMap = () => createStore => (
	(reducerMap, ...rest) => {
		const reducerList = {}
		for (const [key, val] of reducerMap) {
			reducerList[key] = val
		}
		return createStore(
			combineReducers(reducerList),
			...rest,
		)
	}
)

const TYPE = {
	INC_COUNTER: 'INC_COUNTER',
	DEC_COUNTER: 'DEC_COUNTER',
	SET_TIME: 'SET_TIME',
}
const actions = {
	incrementCounter: (incBy) => ({
		type: TYPE.INC_COUNTER,
		incBy,
	}),
	decrementCounter: (decBy) => ({
		type: TYPE.DEC_COUNTER,
		decBy,
	}),
	setTime: (time) => ({
		type: TYPE.SET_TIME,
		time,
	}),
}
const map = new Map()

map.set('counter', (state = 0, action) => {
	switch (action.type) {
		case TYPE.INC_COUNTER: return state + action.incBy
		case TYPE.DEC_COUNTER: return state - action.decBy
		default: return state
	}
})

map.set('time', (state = null, action) => {
	switch (action.type) {
		case TYPE.SET_TIME: return action.time
		default: return state
	}
})

const store = createStore(map, acceptMap())
const {
	incrementCounter,
	decrementCounter,
	setTime,
} = bindActionCreators(actions, store.dispatch)

setInterval(function() {
	setTime(new Date().toTimeString())

	if (this.shouldIncrement) {
		incrementCounter((Math.random() * 5) + 1 | 0)
	} else {
		decrementCounter((Math.random() * 5) + 1 | 0)
	}

	console.dir(
		store.getState(),
		{ colors: true, compact: false },
	)
	this.shouldIncrement = !this.shouldIncrement
}.bind({ shouldIncrement: false }), 1000)
