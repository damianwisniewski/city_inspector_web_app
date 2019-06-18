import { SET_USER_AUTH } from '../actionTypes/userDataActionTypes'

export function authUser(userData) {
	return {
		type: SET_USER_AUTH,
		userData,
	}
}
