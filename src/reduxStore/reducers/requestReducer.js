import {
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_SUCCEEDED,
	CHECK_LOGIN_FAILED,
	CHECK_LOGIN_INITIAL,
	//
	CHECK_SESSION_REQUESTED,
	CHECK_SESSION_ENDED,
	//
	GET_NOTIFICATIONS_REQUESTED,
	GET_NOTIFICATIONS_SUCCEEDED,
	GET_NOTIFICATIONS_FAILED,
	GET_NOTIFICATIONS_INITIAL,
} from '../actionTypes/requestActionTypes'

const initialState = {
	loginRequestStatus: 'initial',
	getNotificationsRequestStatus: 'initial',
	checkSessionStatus: 'pending',
}

const requestReducer = (state = initialState, action) => {
	switch (action.type) {
		// LOGIN
		case CHECK_LOGIN_REQUESTED:
			return {
				...state,
				loginRequestStatus: 'pending',
			}
		case CHECK_LOGIN_SUCCEEDED:
			return {
				...state,
				loginRequestStatus: 'succeeded',
			}
		case CHECK_LOGIN_FAILED:
			return {
				...state,
				loginRequestStatus: 'failed',
			}
		case CHECK_LOGIN_INITIAL:
			return {
				...state,
				loginRequestStatus: 'initial',
			}

		// CHECK SESSION
		case CHECK_SESSION_REQUESTED:
			return {
				...state,
				checkSessionStatus: 'pending',
			}

		case CHECK_SESSION_ENDED:
			return {
				...state,
				checkSessionStatus: 'succeeded',
			}

		// GET NOTIFICATIONS
		case GET_NOTIFICATIONS_REQUESTED:
			return {
				...state,
				getNotificationsRequestStatus: 'pending',
			}
		case GET_NOTIFICATIONS_SUCCEEDED:
			return {
				...state,
				getNotificationsRequestStatus: 'succeeded',
			}
		case GET_NOTIFICATIONS_FAILED:
			return {
				...state,
				getNotificationsRequestStatus: 'failed',
			}
		case GET_NOTIFICATIONS_INITIAL:
			return {
				...state,
				getNotificationsRequestStatus: 'initial',
			}

		default:
			return state
	}
}

export default requestReducer
