import {
	CHECK_LOGIN_REQUESTED,
	CHECK_LOGIN_INITIAL,
	PASS_REMIND_REQUESTED,
	PASS_REMIND_INITIAL,
	REGISTER_REQUESTED,
	REGISTER_INITIAL,
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

export function sagaPassRemind(email) {
	return {
		type: PASS_REMIND_REQUESTED,
		email,
	}
}

export function resetPassRemindRequestStatus() {
	return {
		type: PASS_REMIND_INITIAL,
	}
}

export function sagaRequestRegister(userData) {
	return {
		type: REGISTER_REQUESTED,
		userData,
	}
}

export function resetRequestRegisterStatus() {
	return {
		type: REGISTER_INITIAL,
	}
}
