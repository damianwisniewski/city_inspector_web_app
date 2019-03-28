import { SET_USER_AUTH } from '../actionTypes/actionTypes'

export function authUser(booleanValue) {
	return {
		type: SET_USER_AUTH,
		isUserAuth: booleanValue,
	}
}
