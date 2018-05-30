const fetch = require('node-fetch')

const {
	createStore,
	applyMiddleware,
	combineReducers,
	bindActionCreators,
} = require('redux')

const STATUS = {
	PENDING: 'PENDING',
	RESOLVED: 'RESOLVED',
	REJECTED: 'REJECTED',
}

const TYPE = {
	FETCH_TIME: 'FETCH_TIME',
	FETCH_DATE: 'FETCH_DATE',
}

const actions = {
	fetchTime: () => ({
		type: TYPE.FETCH_TIME,
		value: async () => {
			const time = await fetch(
				'http://localhost:1337/time'
			).then((res) => res.text())
			return time
		}
	}),
	fetchDate: () => ({
		type: TYPE.FETCH_DATE,
		value: async () => {
			const date = await fetch(
				'http://localhost:1337/date'
			).then((res) => res.text())
			return date
		}
	}),
	setTime: (time) => ({
		type: TYPE.FETCH_TIME,
		value: time,
	})
}

const setValue = (prevState, action) => ({
	...prevState,
	value: action.value || null,
	error: action.error || null,
	status: action.status || STATUS.RESOLVED,
})

const iniState = {
	time: {
		value: null,
		error: null,
		status: STATUS.RESOLVED,
	},
	date: {
		value: null,
		error: null,
		status: STATUS.RESOLVED,
	}
}

const timeReducer = (state = iniState, action) => {
	switch (action.type) {
		case TYPE.FETCH_TIME: return {
			...state,
			time: setValue(state.time, action)
		}
		case TYPE.FETCH_DATE: return {
			...state,
			date: setValue(state.date, action)
		}
		default: return state
	}
}

const allowAsync = ({ dispatch }) => next => action => {
	if (typeof action.value === 'function') {
		dispatch({
			type: action.type,
			status: STATUS.PENDING,
		})
		const promise = Promise
			.resolve(action.value())
			.then((value) => dispatch({
				type: action.type,
				status: STATUS.RESOLVED,
				value,
			}))
			.catch((error) => dispatch({
				type: action.type,
				status: STATUS.REJECTED,
				error: error.message,
			}))
		return promise
	}
	return next(action)
}

const store = createStore(
	timeReducer,
	applyMiddleware(
		allowAsync,
	),
)
const {
	setTime,
	fetchTime,
	fetchDate,
} = bindActionCreators(actions, store.dispatch)

store.subscribe(() => {
	console.log('\x1b[1;34m%s\x1b[0m', 'State has changed')
	console.dir(
		store.getState(),
		{ colors: true, compact: false },
	)
})

setTime(new Date().toTimeString())
fetchTime()
fetchDate()
