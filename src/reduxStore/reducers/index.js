import { combineReducers } from 'redux'

import userDataReducer from './userDataReducer'
import requestReducer from './requestReducer'
import notificationsReducer from './notificationsReducer'
import envStatusReducer from './envStatusReducer'

export default combineReducers({
	user: userDataReducer,
	requests: requestReducer,
	notifications: notificationsReducer,
	env: envStatusReducer,
})
