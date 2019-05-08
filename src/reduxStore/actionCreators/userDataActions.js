import { SET_USER_AUTH } from '../actionTypes/userDataActionTypes'

/**
 * Set information is user is Authorized
 * @memberof userDataReducer
 * @argument {boolean} booleanValue
 */
export function authUser(userData) {
	return {
		type: SET_USER_AUTH,
		userData,
	}
}
