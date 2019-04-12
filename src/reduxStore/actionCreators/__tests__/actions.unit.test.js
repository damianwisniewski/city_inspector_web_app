import * as userActions from '../actions'
import * as userActionTypes from '../../actionTypes/actionTypes'

describe('User Actions', () => {
	it('should pass proper authorization data', () => {
		const payload = true
		const action = userActions.authUser(payload)

		expect(action).toEqual({
			type: userActionTypes.SET_USER_AUTH,
			isUserAuth: payload,
		})
	})
})
