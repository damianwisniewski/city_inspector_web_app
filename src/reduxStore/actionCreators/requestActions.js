import {
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_INITIAL,
	GET_NOTIFICATIONS_REQUESTED,
} from '../actionTypes/requestActionTypes'

export function sagaRequestLogin(loginData) {
	return {
		type: CHECK_LOGIN_REQUESTED,
		loginData,
	}
}

export function resetLoginRequestStatus() {
	return {
		type: CHECK_LOGIN_INITIAL,
	}
}

export function sagaRequestNotifications(params) {
	return {
		type: GET_NOTIFICATIONS_REQUESTED,
		params,
	}
}
