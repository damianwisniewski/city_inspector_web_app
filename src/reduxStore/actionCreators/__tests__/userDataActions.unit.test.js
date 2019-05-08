import { authUser } from '../userDataActions'
import { SET_USER_AUTH } from '../../actionTypes/userDataActionTypes'

describe('User Actions', () => {
	it('authUser should pass type SET_USER_AUTH and userData', () => {
		const payload = { test1: 'test1', test2: 'test2' }
		const action = authUser(payload)

		expect(action).toEqual({
			type: SET_USER_AUTH,
			userData: payload,
		})
	})
})
