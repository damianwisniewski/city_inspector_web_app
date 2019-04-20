import { CHECK_LOGIN_REQUESTED } from '../actionTypes/requestActionTypes'

export function requestLogin(loginData) {
	return {
		type: CHECK_LOGIN_REQUESTED,
		loginData,
	}
}
