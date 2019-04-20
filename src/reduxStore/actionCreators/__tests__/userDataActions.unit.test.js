import { authUser } from '../userDataActions'
import { SET_USER_AUTH } from '../../actionTypes/userDataActionTypes'

describe('User Actions', () => {
	it('should pass proper authorization data', () => {
		const payload = true
		const action = authUser(payload)

		expect(action).toEqual({
			type: SET_USER_AUTH,
			isUserAuth: payload,
		})
	})
})
