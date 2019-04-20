import { combineReducers } from 'redux'

import userDataReducer from './userDataReducer'
import requestReducer from './requestReducer'

export default combineReducers({
	user: userDataReducer,
	requests: requestReducer,
})
