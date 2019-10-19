import {
	SET_USER_AUTH,
	SET_TOKEN_EXPIRED,
	CLEAR_USER_AUTH_DATA,
} from '../actionTypes/userDataActionTypes'

export function authUser(userData) {
	return {
		type: SET_USER_AUTH,
		userData,
	}
}

export function removeUserAuthData() {
	return {
		type: CLEAR_USER_AUTH_DATA,
	}
}

export function setTokenExpired(isTokenExpired) {
	return {
		type: SET_TOKEN_EXPIRED,
		isTokenExpired,
		...(isTokenExpired && { isUserAuth: false }),
	}
}
