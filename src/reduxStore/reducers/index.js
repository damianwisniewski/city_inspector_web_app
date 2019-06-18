import { combineReducers } from 'redux'

import userDataReducer from './userDataReducer'
import requestReducer from './requestReducer'
import notificationsReducer from './notificationsReducer'

export default combineReducers({
	user: userDataReducer,
	requests: requestReducer,
	notifications: notificationsReducer,
})
