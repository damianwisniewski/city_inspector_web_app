import {
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_SUCCEEDED,
	CHECK_LOGIN_FAILED,
	CHECK_LOGIN_INITIAL,
	//
	PASS_REMIND_FAILED,
	PASS_REMIND_INITIAL,
	PASS_REMIND_REQUESTED,
	PASS_REMIND_SUCCEEDED,
	//
	REGISTER_FAILED,
	REGISTER_INITIAL,
	REGISTER_REQUESTED,
	REGISTER_SUCCEEDED,
} from '../actionTypes/requestActionTypes'

const initialState = {
	loginRequestStatus: 'initial',
	passReminderRequestStatus: 'initial',
	registerRequestStatus: 'initial',
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

		// PASS REMAINDER
		case PASS_REMIND_REQUESTED:
			return {
				...state,
				passReminderRequestStatus: 'pending',
			}
		case PASS_REMIND_SUCCEEDED:
			return {
				...state,
				passReminderRequestStatus: 'succeeded',
			}
		case PASS_REMIND_FAILED:
			return {
				...state,
				passReminderRequestStatus: 'failed',
			}
		case PASS_REMIND_INITIAL:
			return {
				...state,
				passReminderRequestStatus: 'initial',
			}

		// PASS REMAINDER
		case REGISTER_REQUESTED:
			return {
				...state,
				registerRequestStatus: 'pending',
			}
		case REGISTER_SUCCEEDED:
			return {
				...state,
				registerRequestStatus: 'succeeded',
			}
		case REGISTER_FAILED:
			return {
				...state,
				registerRequestStatus: 'failed',
			}
		case REGISTER_INITIAL:
			return {
				...state,
				registerRequestStatus: 'initial',
			}

		default:
			return state
	}
}

export default requestReducer
