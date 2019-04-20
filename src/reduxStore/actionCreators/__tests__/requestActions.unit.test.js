import { requestLogin } from '../requestActions'
import { CHECK_LOGIN_REQUESTED } from '../../actionTypes/requestActionTypes'

describe('Request actions', () => {
	it('should pass type CHECK_LOGIN_REQUESTED and loginData', () => {
		const payload = { test: 'mock', test2: 'mock2' }
		const action = requestLogin(payload)

		expect(action).toEqual({
			type: CHECK_LOGIN_REQUESTED,
			loginData: payload,
		})
	})
})
