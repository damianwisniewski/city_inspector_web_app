import {
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_SUCCEEDED,
	CHECK_LOGIN_FAILED,
} from '../actionTypes/requestActionTypes'

const initialState = {
	loginCheckRequest: 'initial',
}

const requestReducer = (state = initialState, action) => {
	switch (action.type) {
		case CHECK_LOGIN_REQUESTED:
			return {
				...state,
				loginCheckRequest: 'pending',
			}
		case CHECK_LOGIN_SUCCEEDED:
			return {
				...state,
				loginCheckRequest: 'succeeded',
			}
		case CHECK_LOGIN_FAILED:
			return {
				...state,
				loginCheckRequest: 'failed',
			}
		default:
			return state
	}
}

export default requestReducer
